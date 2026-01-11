import { type ModelConfiguration, Stagehand, type V3Options } from "@browserbasehq/stagehand"

import {
  getBrowserbaseCredentials,
  getDefaultCacheDir,
  getGeminiApiKey,
} from "@/lib/automation/env"
import { getBrowserbaseMcpDefaults } from "@/lib/automation/mcp-config"
import type { AutomationProfile } from "@/lib/automation/types"

const FALLBACK_VIEWPORT = { width: 1920, height: 1080 }
// Latest model: gemini-3-pro-preview (Jan 2026)
const ENFORCED_BROWSER_MODEL = "google/gemini-3-pro-preview"

type BrowserbaseSessionCreateParams = NonNullable<V3Options["browserbaseSessionCreateParams"]>

function parseBooleanEnv(value: string | undefined): boolean | undefined {
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

function parseNumberEnv(value: string | undefined): number | undefined {
  if (!value) {
    return undefined
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return undefined
  }

  return parsed
}

function resolveViewport() {
  const mcpDefaults = getBrowserbaseMcpDefaults()
  const width =
    parseNumberEnv(process.env.BROWSERBASE_BROWSER_WIDTH) ??
    mcpDefaults?.browserWidth ??
    FALLBACK_VIEWPORT.width
  const height =
    parseNumberEnv(process.env.BROWSERBASE_BROWSER_HEIGHT) ??
    mcpDefaults?.browserHeight ??
    FALLBACK_VIEWPORT.height

  return { width, height }
}

function buildDefaultModel(): ModelConfiguration | undefined {
  const geminiApiKey = getGeminiApiKey()

  if (geminiApiKey) {
    return {
      modelName: ENFORCED_BROWSER_MODEL,
      apiKey: geminiApiKey,
    }
  }

  return {
    modelName: ENFORCED_BROWSER_MODEL,
  }
}

function buildBrowserbaseSessionCreateParams(
  profile: AutomationProfile
): BrowserbaseSessionCreateParams {
  const mcpDefaults = getBrowserbaseMcpDefaults()
  const { projectId } = getBrowserbaseCredentials()

  const regionRaw = process.env.BROWSERBASE_REGION
  const region =
    regionRaw === "us-west-2" ||
    regionRaw === "us-east-1" ||
    regionRaw === "eu-central-1" ||
    regionRaw === "ap-southeast-1"
      ? regionRaw
      : undefined

  const contextId = process.env.BROWSERBASE_CONTEXT_ID ?? mcpDefaults?.contextId

  const keepAlive =
    parseBooleanEnv(process.env.BROWSERBASE_KEEP_ALIVE) ?? mcpDefaults?.keepAlive ?? true

  const proxies = parseBooleanEnv(process.env.BROWSERBASE_PROXIES) ?? mcpDefaults?.proxies ?? true

  const persistContext =
    parseBooleanEnv(process.env.BROWSERBASE_PERSIST) ?? mcpDefaults?.persist ?? true

  const advancedStealth = parseBooleanEnv(process.env.BROWSERBASE_ADVANCED_STEALTH) ?? false

  const viewport = resolveViewport()

  const common: BrowserbaseSessionCreateParams = {
    projectId,
    proxies,
    keepAlive,
    timeout: 60 * 60,
    ...(region ? { region } : {}),
    browserSettings: {
      solveCaptchas: true,
      blockAds: true,
      recordSession: true,
      viewport,
      ...(advancedStealth ? { advancedStealth: true } : {}),
      ...(contextId
        ? {
            context: {
              id: contextId,
              persist: persistContext,
            },
          }
        : {}),
    },
  }

  if (profile === "cua_break_glass") {
    return {
      ...common,
      browserSettings: {
        ...common.browserSettings,
        viewport,
      },
    }
  }

  if (profile === "max_speed_repeatable") {
    return {
      ...common,
      timeout: 15 * 60,
    }
  }

  return common
}

export function createStagehand(
  profile: AutomationProfile = "max_success_stealth",
  overrides: Partial<V3Options> = {}
): Stagehand {
  const { apiKey, projectId } = getBrowserbaseCredentials()

  const model = buildDefaultModel()
  const cacheDir = overrides.cacheDir ?? getDefaultCacheDir()

  const opts: V3Options = {
    env: "BROWSERBASE",
    apiKey,
    projectId,
    experimental: true,
    selfHeal: true,
    waitForCaptchaSolves: true,
    domSettleTimeout: 30_000,
    verbose: 1,
    disablePino: true,
    cacheDir,
    model,
    browserbaseSessionCreateParams:
      overrides.browserbaseSessionCreateParams ?? buildBrowserbaseSessionCreateParams(profile),
    ...overrides,
  }

  return new Stagehand(opts)
}
