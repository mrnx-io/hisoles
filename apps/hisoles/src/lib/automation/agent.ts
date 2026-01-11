import type {
  AgentConfig,
  AgentModelConfig,
  NonStreamingAgentInstance,
  Stagehand,
  StreamingAgentInstance,
} from "@browserbasehq/stagehand"

import { getGeminiApiKey } from "@/lib/automation/env"
import { getBrowserbaseMcpDefaults } from "@/lib/automation/mcp-config"

export type AutomationAgentOptions = {
  systemPrompt?: string
  integrations?: (string | object)[]
  stream?: boolean
  model?: string
  executionModel?: string
}

// Latest model: gemini-3-pro-preview (Jan 2026)
const ENFORCED_BROWSER_MODEL = "google/gemini-3-pro-preview"

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

export function createAutomationAgent(
  stagehand: Stagehand,
  options: AutomationAgentOptions = {}
): StreamingAgentInstance | NonStreamingAgentInstance {
  const stream = options.stream ?? false
  const mcpDefaults = getBrowserbaseMcpDefaults()

  const requestedModelName = normalizeNonCuaAgentModel(
    options.model ?? mcpDefaults?.modelName ?? ENFORCED_BROWSER_MODEL
  )

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
