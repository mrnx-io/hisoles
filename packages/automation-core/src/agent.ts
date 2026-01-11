import type {
  AgentConfig,
  AgentModelConfig,
  NonStreamingAgentInstance,
  Stagehand,
  StreamingAgentInstance,
} from "@browserbasehq/stagehand"

import { getGeminiApiKey } from "./env.js"
import { ENFORCED_BROWSER_MODEL } from "./stagehand.js"
import type { AutomationAgentOptions } from "./types.js"

function withProviderApiKey(modelName: string): AgentModelConfig<string> {
  const provider = modelName.split("/")[0]

  if (provider === "google") {
    return { modelName, apiKey: getGeminiApiKey() }
  }

  return { modelName }
}

function normalizeNonCuaAgentModel(modelName: string) {
  if (modelName.startsWith("google/")) {
    return modelName
  }

  if (modelName.startsWith("gemini-")) {
    return `google/${modelName}`
  }

  return modelName
}

/**
 * Creates an automation agent using Stagehand's agent API.
 *
 * The agent uses hybrid mode (DOM + coordinate-based actions) and enforces
 * the configured model for consistency across automation runs.
 *
 * @param stagehand - An initialized Stagehand instance
 * @param options - Agent configuration options
 * @returns A streaming or non-streaming agent instance
 *
 * @example
 * ```typescript
 * const stagehand = createStagehand()
 * await stagehand.init()
 *
 * const agent = createAutomationAgent(stagehand, {
 *   systemPrompt: "You are a checkout automation agent",
 *   stream: false,
 * })
 *
 * const result = await agent.execute({
 *   instruction: "Complete the checkout process",
 *   maxSteps: 20,
 * })
 *
 * await stagehand.close()
 * ```
 */
export function createAutomationAgent(
  stagehand: Stagehand,
  options: AutomationAgentOptions = {}
): StreamingAgentInstance | NonStreamingAgentInstance {
  const stream = options.stream ?? false

  const requestedModelName = normalizeNonCuaAgentModel(options.model ?? ENFORCED_BROWSER_MODEL)

  if (requestedModelName !== ENFORCED_BROWSER_MODEL) {
    throw new Error(
      `Only ${ENFORCED_BROWSER_MODEL} is allowed for browser automation (got: ${requestedModelName}).`
    )
  }

  const requestedExecutionModelName = options.executionModel
    ? normalizeNonCuaAgentModel(options.executionModel)
    : undefined

  if (requestedExecutionModelName && requestedExecutionModelName !== ENFORCED_BROWSER_MODEL) {
    throw new Error(
      `Only ${ENFORCED_BROWSER_MODEL} is allowed for browser automation executionModel (got: ${requestedExecutionModelName}).`
    )
  }

  const modelName = ENFORCED_BROWSER_MODEL
  const executionModelName = ENFORCED_BROWSER_MODEL

  const baseConfig: Omit<AgentConfig, "stream"> = {
    mode: "hybrid",
    systemPrompt:
      options.systemPrompt ??
      "You are a high-agency browser automation agent. Be precise, verify outcomes, and prefer robust actions.",
    integrations: options.integrations as AgentConfig["integrations"],
    model: withProviderApiKey(modelName),
    ...(executionModelName ? { executionModel: withProviderApiKey(executionModelName) } : {}),
  }

  if (stream) {
    return stagehand.agent({ ...baseConfig, stream: true })
  }

  return stagehand.agent(baseConfig)
}
