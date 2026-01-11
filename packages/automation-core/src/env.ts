import type { BrowserbaseCredentials } from "./types.js"

export function getBrowserbaseCredentials(): BrowserbaseCredentials {
  const apiKey = process.env.BROWSERBASE_API_KEY
  const projectId = process.env.BROWSERBASE_PROJECT_ID

  if (!apiKey) {
    throw new Error("BROWSERBASE_API_KEY environment variable is required")
  }

  if (!projectId) {
    throw new Error("BROWSERBASE_PROJECT_ID environment variable is required")
  }

  return { apiKey, projectId }
}

export function getGeminiApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY
}

export function getDefaultCacheDir(): string | undefined {
  return process.env.STAGEHAND_CACHE_DIR ?? ".cache/stagehand"
}

export function parseBooleanEnv(value: string | undefined): boolean | undefined {
  if (!value) {
    return undefined
  }

  if (value === "true") {
    return true
  }

  if (value === "false") {
    return false
  }

  return undefined
}

export function parseNumberEnv(value: string | undefined): number | undefined {
  if (!value) {
    return undefined
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return undefined
  }

  return parsed
}
