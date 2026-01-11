import { z } from "zod"

export const WhopPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string().default("USD"),
  interval: z.enum(["one_time", "day", "week", "month", "year"]).optional(),
})

export type WhopPlan = z.infer<typeof WhopPlanSchema>

export const WhopCheckoutConfigSchema = z.object({
  planId: z.string(),
  returnUrl: z.string().url(),
  cancelUrl: z.string().url().optional(),
  theme: z.enum(["light", "dark"]).default("light"),
  prefill: z
    .object({
      email: z.string().email().optional(),
      name: z.string().optional(),
    })
    .optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export type WhopCheckoutConfig = z.infer<typeof WhopCheckoutConfigSchema>

export const WhopPaymentSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "succeeded", "failed", "refunded"]),
  amount: z.number(),
  currency: z.string(),
  planId: z.string(),
  membershipId: z.string().optional(),
  createdAt: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export type WhopPayment = z.infer<typeof WhopPaymentSchema>

export const WhopMembershipSchema = z.object({
  id: z.string(),
  status: z.enum(["active", "inactive", "cancelled", "expired"]),
  planId: z.string(),
  userId: z.string(),
  manageUrl: z.string().url().optional(),
  createdAt: z.string(),
  expiresAt: z.string().optional(),
})

export type WhopMembership = z.infer<typeof WhopMembershipSchema>

export const WhopWebhookEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    "payment.succeeded",
    "payment.failed",
    "membership.created",
    "membership.cancelled",
    "membership.expired",
  ]),
  data: z.unknown(),
  createdAt: z.string(),
})

export type WhopWebhookEvent = z.infer<typeof WhopWebhookEventSchema>

export type WhopClientConfig = {
  apiKey: string
  appId?: string
  webhookSecret?: string
}
