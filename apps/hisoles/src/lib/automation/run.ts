import type { LogLine, Stagehand, StagehandMetrics } from "@browserbasehq/stagehand"

import { createJsonFileResultStore } from "@/lib/automation/persistence/json-file-store"
import { createStagehand } from "@/lib/automation/stagehand-factory"
import { runAutomationTask } from "@/lib/automation/tasks"
import type {
  AutomationEvent,
  AutomationProfile,
  AutomationRunRequest,
  AutomationRunResult,
} from "@/lib/automation/types"

function nowIso() {
  return new Date().toISOString()
}

function toErrorString(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

function stagehandLogLineToEvent(line: LogLine): AutomationEvent {
  const level =
    line.level === 2 ? "debug" : line.level === 1 ? "info" : line.level === 0 ? "warn" : "info"

  return {
    type: "log",
    level,
    message: line.message,
  }
}

function evaluateTaskOutput(
  task: AutomationRunRequest["task"],
  output: unknown
): {
  ok: boolean
  errorMessage?: string
} {
  if (task === "smoke") {
    if (output && typeof output === "object" && "results" in output) {
      const results = (output as { results?: unknown }).results
      if (Array.isArray(results)) {
        const failures = results.filter((item) => {
          if (!item || typeof item !== "object") {
            return false
          }

          const error = (item as { error?: unknown }).error
          return typeof error === "string" && error.length > 0
        })

        if (failures.length > 0) {
          const first = failures[0] as { url?: unknown; error?: unknown }
          const url = typeof first.url === "string" ? first.url : "(unknown url)"
          const message = typeof first.error === "string" ? first.error : "(unknown error)"
          return { ok: false, errorMessage: `Smoke failed: ${url}: ${message}` }
        }
      }
    }

    return { ok: true }
  }

  if (task === "agent_execute") {
    if (output && typeof output === "object" && "success" in output) {
      const success = (output as { success?: unknown }).success
      if (success === false) {
        const message = (output as { message?: unknown }).message
        return {
          ok: false,
          errorMessage: typeof message === "string" && message.length ? message : "Agent failed",
        }
      }
    }

    return { ok: true }
  }

  return { ok: true }
}

export type RunAutomationOptions = {
  onEvent?: (event: AutomationEvent) => void
  persistResults?: boolean
  resultsDir?: string
}

export async function runAutomation(
  request: AutomationRunRequest,
  options: RunAutomationOptions = {}
): Promise<AutomationRunResult> {
  const startedAt = nowIso()
  const startTime = Date.now()

  const profile: AutomationProfile = request.profile ?? "max_success_stealth"
  const emit = (event: AutomationEvent) => options.onEvent?.(event)

  const stagehandLogger = (line: LogLine) => {
    emit(stagehandLogLineToEvent(line))
  }

  let stagehand: Stagehand | undefined

  try {
    emit({ type: "status", message: `stagehand:create:${profile}` })
    stagehand = createStagehand(profile, { logger: stagehandLogger })

    emit({ type: "status", message: "stagehand:init" })
    await stagehand.init()

    const input =
      request.task === "agent_execute" &&
      request.integrations?.length &&
      request.input &&
      typeof request.input === "object" &&
      !Array.isArray(request.input)
        ? {
            ...(request.input as Record<string, unknown>),
            integrations:
              (request.input as Record<string, unknown>).integrations ?? request.integrations,
            stream: (request.input as Record<string, unknown>).stream ?? request.stream,
          }
        : request.input

    emit({ type: "status", message: `task:start:${request.task}` })
    const output = await runAutomationTask(request.task, stagehand, input, emit)
    emit({ type: "status", message: `task:done:${request.task}` })

    const metrics: StagehandMetrics = await stagehand.metrics

    const evaluation = evaluateTaskOutput(request.task, output)

    const result: AutomationRunResult = {
      ok: evaluation.ok,
      task: request.task,
      profile,
      startedAt,
      endedAt: nowIso(),
      durationMs: Date.now() - startTime,
      browserbase: {
        sessionId: stagehand.browserbaseSessionID,
        sessionUrl: stagehand.browserbaseSessionURL,
        debugUrl: stagehand.browserbaseDebugURL,
      },
      metrics,
      output,
      ...(evaluation.ok
        ? {}
        : {
            error: {
              message: evaluation.errorMessage ?? "Task reported failure",
            },
          }),
    }

    const persist = options.persistResults ?? process.env.AUTOMATION_PERSIST_RESULTS !== "false"

    if (persist) {
      const resultsDir = options.resultsDir ?? ".automation-results"
      const store = createJsonFileResultStore(resultsDir)
      const artifact = await store.save(result)
      result.artifact = artifact
    }

    emit({ type: "done", result })
    return result
  } catch (error) {
    const endedAt = nowIso()
    const message = toErrorString(error)

    const result: AutomationRunResult = {
      ok: false,
      task: request.task,
      profile: request.profile ?? "max_success_stealth",
      startedAt,
      endedAt,
      durationMs: Date.now() - startTime,
      error: {
        message,
        stack: error instanceof Error ? error.stack : undefined,
      },
    }

    emit({ type: "error", message })
    emit({ type: "done", result })
    return result
  } finally {
    if (stagehand) {
      try {
        await stagehand.close()
      } catch {
        // ignore close errors
      }
    }
  }
}
