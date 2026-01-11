import type {
  NonStreamingAgentInstance,
  Stagehand,
  StreamingAgentInstance,
} from "@browserbasehq/stagehand"

import { createAutomationAgent } from "@/lib/automation/agent"
import { resolveAutomationMcpIntegrations } from "@/lib/automation/integrations"
import type { AutomationEvent } from "@/lib/automation/types"

export type AgentExecuteTaskInput = {
  instruction: string
  startUrl?: string
  maxSteps?: number
  model?: string
  executionModel?: string
  integrations?: string[]
  stream?: boolean
}

function emit(onEvent: ((event: AutomationEvent) => void) | undefined, event: AutomationEvent) {
  onEvent?.(event)
}

export async function runAgentExecuteTask(
  stagehand: Stagehand,
  input: AgentExecuteTaskInput,
  onEvent?: (event: AutomationEvent) => void
) {
  const page = stagehand.context.activePage() ?? stagehand.context.pages()[0]

  if (input.startUrl) {
    emit(onEvent, { type: "status", message: `navigate:${input.startUrl}` })
    await page.goto(input.startUrl)
  }

  const { clients: integrations, close } = await resolveAutomationMcpIntegrations(
    input.integrations
  )

  try {
    const stream = input.stream ?? false
    const agent = createAutomationAgent(stagehand, {
      model: input.model,
      executionModel: input.executionModel,
      integrations,
      stream,
    })

    if (stream) {
      emit(onEvent, { type: "status", message: "agent:streaming" })
      const streamResult = await (agent as StreamingAgentInstance).execute({
        instruction: input.instruction,
        maxSteps: input.maxSteps,
        page,
      })

      for await (const chunk of streamResult.textStream) {
        emit(onEvent, { type: "data", name: "chunk", data: chunk })
      }

      const result = await streamResult.result
      emit(onEvent, { type: "data", name: "agentResult", data: result })
      return result
    }

    emit(onEvent, { type: "status", message: "agent:execute" })
    const result = await (agent as NonStreamingAgentInstance).execute({
      instruction: input.instruction,
      maxSteps: input.maxSteps,
      page,
    })
    emit(onEvent, { type: "data", name: "agentResult", data: result })
    return result
  } finally {
    await close()
  }
}
