#!/usr/bin/env node
import { createJobRunner } from "./runner.js"
import { JobConfigSchema, type JobConfig } from "./types.js"

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Job Automator CLI

Usage:
  job-automator <config-file>      Run a job from a JSON config file
  job-automator --demo             Run a demo job
  job-automator --help             Show this help message

Options:
  --verbose, -v     Enable verbose logging
  --profile <name>  Automation profile (max_success_stealth, balanced, speed)

Examples:
  job-automator job.json
  job-automator --demo --verbose
`)
    process.exit(0)
  }

  const verbose = args.includes("--verbose") || args.includes("-v")
  const profileArg = args.find((a) => a.startsWith("--profile="))
  const profile = (profileArg?.split("=")[1] as "max_success_stealth" | "max_speed_repeatable" | "cua_break_glass") ?? "max_success_stealth"

  const runner = createJobRunner({ profile, verbose })

  if (args.includes("--demo")) {
    console.log("Running demo job...")

    const demoJob: JobConfig = {
      id: "demo-job",
      name: "Demo: Extract Hacker News Headlines",
      url: "https://news.ycombinator.com",
      actions: [
        {
          type: "extract",
          instruction: "Extract the titles of the top 5 stories on the front page",
          options: { key: "headlines" },
        },
        { type: "screenshot", instruction: "Capture the front page" },
      ],
      retries: 3,
      timeout: 60000,
    }

    const result = await runner.run(demoJob)

    console.log("\n--- Job Result ---")
    console.log(`Status: ${result.status}`)
    console.log(`Duration: ${result.duration}ms`)
    console.log(`Steps: ${result.steps.length}`)

    if (result.extractedData) {
      console.log("\nExtracted Data:")
      console.log(JSON.stringify(result.extractedData, null, 2))
    }

    if (result.steps.some((s) => s.status === "failure")) {
      console.log("\nFailures:")
      result.steps
        .filter((s) => s.status === "failure")
        .forEach((s) => console.log(`  - ${s.action}: ${s.error}`))
    }

    process.exit(result.status === "success" ? 0 : 1)
  }

  // Load config from file
  const configPath = args.find((a) => !a.startsWith("-"))
  if (!configPath) {
    console.error("Error: No config file specified")
    process.exit(1)
  }

  try {
    const configFile = await Bun.file(configPath).text()
    const configJson = JSON.parse(configFile)
    const config = JobConfigSchema.parse(configJson)

    console.log(`Running job: ${config.name}`)
    const result = await runner.run(config)

    console.log("\n--- Job Result ---")
    console.log(JSON.stringify(result, null, 2))

    process.exit(result.status === "success" ? 0 : 1)
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main().catch(console.error)
