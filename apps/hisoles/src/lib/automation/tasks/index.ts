import type { Stagehand } from "@browserbasehq/stagehand"
import { z } from "zod"

import { runAgentExecuteTask } from "@/lib/automation/tasks/agent-execute"
import { runSmokeTask } from "@/lib/automation/tasks/smoke"
import type { AutomationEvent, AutomationTaskName } from "@/lib/automation/types"

const SmokeInputSchema = z
  .object({
    urls: z.array(z.string().url()).optional(),
  })
  .default({})

const AgentExecuteInputSchema = z.object({
  instruction: z.string().min(1),
  startUrl: z.string().url().optional(),
  maxSteps: z.number().int().min(1).max(200).optional(),
  model: z.string().min(1).optional(),
  executionModel: z.string().min(1).optional(),
  integrations: z.array(z.string().min(1)).optional(),
  stream: z.boolean().optional(),
})

export async function runAutomationTask(
  task: AutomationTaskName,
  stagehand: Stagehand,
  input: unknown,
  onEvent?: (event: AutomationEvent) => void
) {
  if (task === "smoke") {
    const parsedInput = SmokeInputSchema.parse(input)
    return runSmokeTask(stagehand, parsedInput, onEvent)
  }

  if (task === "agent_execute") {
    const parsedInput = AgentExecuteInputSchema.parse(input)
    return runAgentExecuteTask(stagehand, parsedInput, onEvent)
  }

  const exhaustiveCheck: never = task
  return exhaustiveCheck
}
