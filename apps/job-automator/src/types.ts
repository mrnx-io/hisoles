import { z } from "zod"

export const JobConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  actions: z.array(
    z.object({
      type: z.enum(["navigate", "act", "extract", "wait", "screenshot"]),
      instruction: z.string(),
      options: z.record(z.string(), z.unknown()).optional(),
    })
  ),
  schedule: z
    .object({
      cron: z.string().optional(),
      interval: z.number().optional(),
    })
    .optional(),
  retries: z.number().default(3),
  timeout: z.number().default(60000),
})

export type JobConfig = z.infer<typeof JobConfigSchema>

export const JobResultSchema = z.object({
  jobId: z.string(),
  status: z.enum(["success", "failure", "partial"]),
  startedAt: z.string(),
  completedAt: z.string(),
  duration: z.number(),
  steps: z.array(
    z.object({
      action: z.string(),
      status: z.enum(["success", "failure", "skipped"]),
      result: z.unknown().optional(),
      error: z.string().optional(),
    })
  ),
  screenshots: z.array(z.string()).optional(),
  extractedData: z.record(z.string(), z.unknown()).optional(),
})

export type JobResult = z.infer<typeof JobResultSchema>

export type JobRunnerOptions = {
  profile?: "max_success_stealth" | "max_speed_repeatable" | "cua_break_glass"
  headless?: boolean
  verbose?: boolean
}
