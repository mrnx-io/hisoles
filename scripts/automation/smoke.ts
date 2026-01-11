import { runAutomation } from "@/lib/automation/run"
import type { AutomationProfile } from "@/lib/automation/types"

function parseArgs(argv: string[]) {
  const urls: string[] = []
  let profile: AutomationProfile | undefined
  let persistResults = true

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]

    if (arg === "--url" && argv[i + 1]) {
      urls.push(argv[i + 1])
      i += 1
      continue
    }

    if (arg.startsWith("--url=")) {
      urls.push(arg.slice("--url=".length))
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

    if (arg === "--no-store") {
      persistResults = false
    }
  }

  return { urls, profile, persistResults }
}

const { urls, profile, persistResults } = parseArgs(process.argv.slice(2))

const result = await runAutomation(
  {
    task: "smoke",
    profile,
    input: urls.length ? { urls } : undefined,
  },
  {
    persistResults,
    onEvent(event) {
      if (event.type === "status") {
        console.log(`[status] ${event.message}`)
      }
    },
  }
)

console.log(JSON.stringify(result, null, 2))
