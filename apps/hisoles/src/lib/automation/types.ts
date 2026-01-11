export type AutomationProfile = "max_success_stealth" | "max_speed_repeatable" | "cua_break_glass"

export type AutomationTaskName = "smoke" | "agent_execute"

export type AutomationLogLevel = "debug" | "info" | "warn" | "error"

export type AutomationEvent =
  | { type: "status"; message: string }
  | { type: "log"; level: AutomationLogLevel; message: string }
  | { type: "data"; name: string; data: unknown }
  | { type: "done"; result: AutomationRunResult }
  | { type: "error"; message: string }

export type AutomationRunResult = {
  ok: boolean
  task: AutomationTaskName
  profile: AutomationProfile
  startedAt: string
  endedAt: string
  durationMs: number
  browserbase?: {
    sessionId?: string
    sessionUrl?: string
    debugUrl?: string
  }
  metrics?: unknown
  output?: unknown
  error?: {
    message: string
    stack?: string
  }
  artifact?: {
    id: string
    path: string
  }
}

export type AutomationRunRequest = {
  task: AutomationTaskName
  profile?: AutomationProfile
  input?: unknown
  integrations?: string[]
  stream?: boolean
}
