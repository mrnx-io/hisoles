import type { Stagehand } from "@browserbasehq/stagehand"
import { z } from "zod"
import type { AutomationEvent } from "@/lib/automation/types"

export type SmokeTaskInput = {
  urls?: string[]
}

function emit(onEvent: ((event: AutomationEvent) => void) | undefined, event: AutomationEvent) {
  onEvent?.(event)
}

export async function runSmokeTask(
  stagehand: Stagehand,
  input: SmokeTaskInput,
  onEvent?: (event: AutomationEvent) => void
) {
  const urls = input.urls ?? [process.env.AUTOMATION_SMOKE_URL ?? "https://example.com"]
  const page = stagehand.context.activePage() ?? stagehand.context.pages()[0]

  const results: Array<{
    url: string
    extracted?: unknown
    error?: string
  }> = []

  for (const url of urls) {
    emit(onEvent, { type: "status", message: `navigate:${url}` })
    await page.goto(url)

    try {
      emit(onEvent, { type: "status", message: `extract:${url}` })
      const extracted = await stagehand.extract(
        `Extract the page title and the main H1 heading from ${url}.`,
        z.object({
          title: z.string().optional(),
          h1: z.string().optional(),
        }),
        { page }
      )

      results.push({ url, extracted })
      emit(onEvent, { type: "data", name: "extracted", data: { url, extracted } })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      emit(onEvent, { type: "log", level: "warn", message: `extract failed: ${url}: ${message}` })

      results.push({ url, error: message })
    }
  }

  return { results }
}
