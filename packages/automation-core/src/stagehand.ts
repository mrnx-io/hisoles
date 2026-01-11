import { type ModelConfiguration, Stagehand, type V3Options } from "@browserbasehq/stagehand"

import {
  getBrowserbaseCredentials,
  getDefaultCacheDir,
  getGeminiApiKey,
  parseBooleanEnv,
  parseNumberEnv,
} from "./env.js"
import type { AutomationProfile, StagehandFactoryOptions } from "./types.js"

const FALLBACK_VIEWPORT = { width: 1920, height: 1080 }

// Latest Stagehand v3 model: gemini-3-pro-preview (Jan 2026)
// Pro offers superior reasoning for complex browser automation tasks
const ENFORCED_BROWSER_MODEL = "google/gemini-3-pro-preview"

type BrowserbaseSessionCreateParams = NonNullable<V3Options["browserbaseSessionCreateParams"]>

function resolveViewport(options?: StagehandFactoryOptions) {
  const width =
    options?.viewport?.width ??
    parseNumberEnv(process.env.BROWSERBASE_BROWSER_WIDTH) ??
    FALLBACK_VIEWPORT.width
  const height =
    options?.viewport?.height ??
    parseNumberEnv(process.env.BROWSERBASE_BROWSER_HEIGHT) ??
    FALLBACK_VIEWPORT.height

  return { width, height }
}

function buildDefaultModel(geminiApiKey?: string): ModelConfiguration | undefined {
  const apiKey = geminiApiKey ?? getGeminiApiKey()

  if (apiKey) {
    return {
      modelName: ENFORCED_BROWSER_MODEL,
      apiKey,
    }
  }

  return {
    modelName: ENFORCED_BROWSER_MODEL,
  }
}

function buildBrowserbaseSessionCreateParams(
  profile: AutomationProfile,
  options?: StagehandFactoryOptions
): BrowserbaseSessionCreateParams {
  const { projectId } = options?.projectId
    ? { projectId: options.projectId }
    : getBrowserbaseCredentials()

  const region =
    options?.region ??
    (process.env.BROWSERBASE_REGION as BrowserbaseSessionCreateParams["region"] | undefined)

  const contextId = options?.contextId ?? process.env.BROWSERBASE_CONTEXT_ID

  const keepAlive =
    options?.keepAlive ?? parseBooleanEnv(process.env.BROWSERBASE_KEEP_ALIVE) ?? true

  const proxies = options?.proxies ?? parseBooleanEnv(process.env.BROWSERBASE_PROXIES) ?? true

  const persistContext =
    options?.persistContext ?? parseBooleanEnv(process.env.BROWSERBASE_PERSIST) ?? true

  const advancedStealth =
    options?.advancedStealth ?? parseBooleanEnv(process.env.BROWSERBASE_ADVANCED_STEALTH) ?? false

  const viewport = resolveViewport(options)

  const baseTimeout = options?.timeout ?? 60 * 60

  const common: BrowserbaseSessionCreateParams = {
    projectId,
    proxies,
    keepAlive,
    timeout: baseTimeout,
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

/**
 * Creates a configured Stagehand instance for browser automation.
 *
 * @param options - Configuration options for the Stagehand instance
 * @returns A new Stagehand instance ready to be initialized with `.init()`
 *
 * @example
 * ```typescript
 * const stagehand = createStagehand({ profile: "max_success_stealth" })
 * await stagehand.init()
 *
 * const page = stagehand.context.pages()[0]
 * await page.goto("https://example.com")
 *
 * // Stagehand v3: methods on stagehand, not page
 * await stagehand.act("click the login button")
 * const data = await stagehand.extract("extract the page title")
 *
 * await stagehand.close()
 * ```
 */
export function createStagehand(options: StagehandFactoryOptions = {}): Stagehand {
  const profile = options.profile ?? "max_success_stealth"
  const { apiKey, projectId } = options.apiKey
    ? { apiKey: options.apiKey, projectId: options.projectId ?? "" }
    : getBrowserbaseCredentials()

  const model = buildDefaultModel(options.geminiApiKey)
  const cacheDir = options.cacheDir ?? getDefaultCacheDir()

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
    browserbaseSessionCreateParams: buildBrowserbaseSessionCreateParams(profile, options),
  }

  return new Stagehand(opts)
}

export { ENFORCED_BROWSER_MODEL }
