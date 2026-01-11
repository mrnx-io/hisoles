import { z } from "zod"

import { getDefaultAutomationIntegrations } from "@/lib/automation/env"
import { runAutomation } from "@/lib/automation/run"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const BodySchema = z.object({
  task: z.enum(["smoke", "agent_execute"]),
  profile: z.enum(["max_success_stealth", "max_speed_repeatable", "cua_break_glass"]).optional(),
  input: z.unknown().optional(),
  integrations: z.array(z.string().min(1)).optional(),
  stream: z.boolean().optional(),
})

function wantsSse(req: Request, streamFlag: boolean | undefined) {
  if (streamFlag) {
    return true
  }

  const accept = req.headers.get("accept")
  return accept?.includes("text/event-stream") ?? false
}

function createSseResponse(handler: (send: (event: unknown) => void) => Promise<void>) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }

      try {
        await handler(send)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        send({ type: "error", message })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const parsed = BodySchema.parse(body)
  const integrations = parsed.integrations ?? getDefaultAutomationIntegrations()
  const stream = wantsSse(req, parsed.stream)

  if (stream) {
    return createSseResponse(async (send) => {
      await runAutomation(
        {
          task: parsed.task,
          profile: parsed.profile,
          input: parsed.input,
          integrations,
          stream: true,
        },
        {
          resultsDir: "/tmp/automation-results",
          onEvent(event) {
            send(event)
          },
        }
      )
    })
  }

  const result = await runAutomation(
    {
      task: parsed.task,
      profile: parsed.profile,
      input: parsed.input,
      integrations,
      stream: false,
    },
    { resultsDir: "/tmp/automation-results" }
  )

  return Response.json(result)
}
