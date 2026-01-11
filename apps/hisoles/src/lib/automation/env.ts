import { getBrowserbaseMcpDefaults } from "@/lib/automation/mcp-config"

export function getBrowserbaseCredentials() {
  const mcpDefaults = getBrowserbaseMcpDefaults()
  const apiKey = process.env.BROWSERBASE_API_KEY ?? mcpDefaults?.env?.BROWSERBASE_API_KEY
  const projectId = process.env.BROWSERBASE_PROJECT_ID ?? mcpDefaults?.env?.BROWSERBASE_PROJECT_ID

  if (!apiKey) {
    throw new Error("Missing BROWSERBASE_API_KEY")
  }

  if (!projectId) {
    throw new Error("Missing BROWSERBASE_PROJECT_ID")
  }

  return { apiKey, projectId }
}

export function getGeminiApiKey() {
  const mcpDefaults = getBrowserbaseMcpDefaults()

  return (
    process.env.GEMINI_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GOOGLE_API_KEY ??
    mcpDefaults?.env?.GEMINI_API_KEY ??
    mcpDefaults?.modelApiKey
  )
}

export function getAnthropicApiKey() {
  return process.env.ANTHROPIC_API_KEY
}

export function getOpenAIApiKey() {
  return process.env.OPENAI_API_KEY
}

export function getXaiApiKey() {
  const mcpDefaults = getBrowserbaseMcpDefaults()
  return process.env.XAI_API_KEY ?? mcpDefaults?.env?.XAI_API_KEY
}

export function getDefaultCacheDir() {
  if (process.env.VERCEL) {
    return "/tmp/stagehand-cache"
  }

  return ".cache/stagehand"
}

export function getDefaultAutomationIntegrations(): string[] {
  const raw = process.env.AUTOMATION_MCP_INTEGRATIONS
  if (!raw) {
    return []
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
}
