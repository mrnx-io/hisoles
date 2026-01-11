import { runAutomation } from "@/lib/automation/run"
import type { AutomationProfile } from "@/lib/automation/types"

function parseArgs(argv: string[]) {
  let instruction: string | undefined
  let startUrl: string | undefined
  let profile: AutomationProfile | undefined
  let mode: "dom" | "hybrid" | "cua" | undefined
  let model: string | undefined
  let executionModel: string | undefined
  let maxSteps: number | undefined
  const integrations: string[] = []
  let stream = false
  let persistResults = true

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]

    if (arg === "--instruction" && argv[i + 1]) {
      instruction = argv[i + 1]
      i += 1
      continue
    }

    if (arg.startsWith("--instruction=")) {
      instruction = arg.slice("--instruction=".length)
      continue
    }

    if (arg === "--start-url" && argv[i + 1]) {
      startUrl = argv[i + 1]
      i += 1
      continue
    }

    if (arg.startsWith("--start-url=")) {
      startUrl = arg.slice("--start-url=".length)
      continue
    }

    if (arg === "--profile" && argv[i + 1]) {
      profile = argv[i + 1] as AutomationProfile
      i += 1
      continue
    }

    if (arg.startsWith("--profile=")) {
      profile = arg.slice("--profile=".length) as AutomationProfile
      continue
    }

    if (arg === "--mode" && argv[i + 1]) {
      mode = argv[i + 1] as "dom" | "hybrid" | "cua"
      i += 1
      continue
    }

    if (arg.startsWith("--mode=")) {
      mode = arg.slice("--mode=".length) as "dom" | "hybrid" | "cua"
      continue
    }

    if (arg === "--model" && argv[i + 1]) {
      model = argv[i + 1]
      i += 1
      continue
    }

    if (arg.startsWith("--model=")) {
      model = arg.slice("--model=".length)
      continue
    }

    if (arg === "--execution-model" && argv[i + 1]) {
      executionModel = argv[i + 1]
      i += 1
      continue
    }

    if (arg.startsWith("--execution-model=")) {
      executionModel = arg.slice("--execution-model=".length)
      continue
    }

    if (arg === "--max-steps" && argv[i + 1]) {
      maxSteps = Number(argv[i + 1])
      i += 1
      continue
    }

    if (arg.startsWith("--max-steps=")) {
      maxSteps = Number(arg.slice("--max-steps=".length))
      continue
    }

    if (arg === "--integration" && argv[i + 1]) {
      integrations.push(argv[i + 1])
      i += 1
      continue
    }

    if (arg.startsWith("--integration=")) {
      integrations.push(arg.slice("--integration=".length))
      continue
    }

    if (arg === "--stream") {
      stream = true
      continue
    }

    if (arg === "--no-store") {
      persistResults = false
    }
  }

  return {
    instruction,
    startUrl,
    profile,
    mode,
    model,
    executionModel,
    maxSteps,
    integrations,
    stream,
    persistResults,
  }
}

const args = parseArgs(process.argv.slice(2))

if (!args.instruction) {
  throw new Error("Missing --instruction")
}

const result = await runAutomation(
  {
    task: "agent_execute",
    profile: args.profile,
    input: {
      instruction: args.instruction,
      startUrl: args.startUrl,
      maxSteps: args.maxSteps,
      mode: args.mode,
      model: args.model,
      executionModel: args.executionModel,
      integrations: args.integrations.length ? args.integrations : undefined,
      stream: args.stream,
    },
  },
  {
    persistResults: args.persistResults,
    onEvent(event) {
      if (event.type === "status") {
        console.log(`[status] ${event.message}`)
      }

      if (event.type === "data" && event.name === "chunk") {
        const chunk = event.data
        if (typeof chunk === "string") {
          process.stdout.write(chunk)
        } else {
          process.stdout.write(String(chunk))
        }
      }
    },
  }
)

console.log(`\n${JSON.stringify(result, null, 2)}`)
