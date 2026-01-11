import { createStagehand } from "@agi/automation-core"
import type { JobConfig, JobResult, JobRunnerOptions } from "./types.js"

/**
 * Job automation runner that executes browser automation jobs
 * using Stagehand v3 and Browserbase.
 *
 * @example
 * ```typescript
 * const runner = createJobRunner({ profile: "max_success_stealth" })
 *
 * const result = await runner.run({
 *   id: "login-job",
 *   name: "Login to Dashboard",
 *   url: "https://example.com/login",
 *   actions: [
 *     { type: "act", instruction: "Fill in username with 'user@example.com'" },
 *     { type: "act", instruction: "Fill in password with '***'" },
 *     { type: "act", instruction: "Click the login button" },
 *     { type: "extract", instruction: "Extract the welcome message" },
 *   ],
 * })
 * ```
 */
export function createJobRunner(options: JobRunnerOptions = {}) {
  const profile = options.profile ?? "max_success_stealth"
  const verbose = options.verbose ?? false

  function log(...args: unknown[]) {
    if (verbose) {
      console.log("[job-automator]", ...args)
    }
  }

  return {
    /**
     * Run a single job configuration
     */
    async run(config: JobConfig): Promise<JobResult> {
      const startedAt = new Date().toISOString()
      const steps: JobResult["steps"] = []
      const screenshots: string[] = []
      let extractedData: Record<string, unknown> = {}

      log(`Starting job: ${config.name} (${config.id})`)

      const stagehand = createStagehand({ profile })

      try {
        await stagehand.init()
        log("Stagehand initialized")

        const page = stagehand.context.pages()[0]
        if (!page) {
          throw new Error("No page available")
        }

        // Navigate to the starting URL
        log(`Navigating to ${config.url}`)
        await page.goto(config.url)
        steps.push({ action: `navigate: ${config.url}`, status: "success" })

        // Execute each action
        for (const action of config.actions) {
          log(`Executing action: ${action.type} - ${action.instruction}`)

          try {
            switch (action.type) {
              case "navigate": {
                await page.goto(action.instruction)
                steps.push({
                  action: `navigate: ${action.instruction}`,
                  status: "success",
                })
                break
              }

              case "act": {
                await stagehand.act(action.instruction)
                steps.push({
                  action: `act: ${action.instruction}`,
                  status: "success",
                })
                break
              }

              case "extract": {
                const result = await stagehand.extract(action.instruction)
                const key =
                  (action.options?.key as string) ??
                  `extract_${steps.length}`
                extractedData[key] = result
                steps.push({
                  action: `extract: ${action.instruction}`,
                  status: "success",
                  result,
                })
                break
              }

              case "wait": {
                const ms = parseInt(action.instruction, 10) || 1000
                await new Promise((resolve) => setTimeout(resolve, ms))
                steps.push({
                  action: `wait: ${ms}ms`,
                  status: "success",
                })
                break
              }

              case "screenshot": {
                const screenshotBuffer = await page.screenshot()
                const screenshotBase64 =
                  Buffer.from(screenshotBuffer).toString("base64")
                screenshots.push(screenshotBase64)
                steps.push({
                  action: `screenshot: ${action.instruction}`,
                  status: "success",
                })
                break
              }
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : String(error)
            log(`Action failed: ${errorMessage}`)
            steps.push({
              action: `${action.type}: ${action.instruction}`,
              status: "failure",
              error: errorMessage,
            })

            // Continue with remaining actions unless critical
            if (action.type === "navigate") {
              throw error
            }
          }
        }

        const completedAt = new Date().toISOString()
        const duration = Date.now() - new Date(startedAt).getTime()

        const hasFailures = steps.some((s) => s.status === "failure")

        return {
          jobId: config.id,
          status: hasFailures ? "partial" : "success",
          startedAt,
          completedAt,
          duration,
          steps,
          screenshots: screenshots.length > 0 ? screenshots : undefined,
          extractedData:
            Object.keys(extractedData).length > 0 ? extractedData : undefined,
        }
      } catch (error) {
        const completedAt = new Date().toISOString()
        const duration = Date.now() - new Date(startedAt).getTime()
        const errorMessage =
          error instanceof Error ? error.message : String(error)

        log(`Job failed: ${errorMessage}`)

        return {
          jobId: config.id,
          status: "failure",
          startedAt,
          completedAt,
          duration,
          steps: [
            ...steps,
            { action: "job execution", status: "failure", error: errorMessage },
          ],
          screenshots: screenshots.length > 0 ? screenshots : undefined,
          extractedData:
            Object.keys(extractedData).length > 0 ? extractedData : undefined,
        }
      } finally {
        await stagehand.close()
        log("Stagehand closed")
      }
    },

    /**
     * Run multiple jobs sequentially
     */
    async runAll(configs: JobConfig[]): Promise<JobResult[]> {
      const results: JobResult[] = []

      for (const config of configs) {
        const result = await this.run(config)
        results.push(result)
      }

      return results
    },

    /**
     * Run multiple jobs in parallel (with concurrency limit)
     */
    async runParallel(
      configs: JobConfig[],
      concurrency = 3
    ): Promise<JobResult[]> {
      const results: JobResult[] = []
      const queue = [...configs]

      const workers = Array.from({ length: concurrency }, async () => {
        while (queue.length > 0) {
          const config = queue.shift()
          if (config) {
            const result = await this.run(config)
            results.push(result)
          }
        }
      })

      await Promise.all(workers)
      return results
    },
  }
}

export type JobRunner = ReturnType<typeof createJobRunner>
