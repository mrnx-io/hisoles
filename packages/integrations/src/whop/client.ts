import type {
  WhopCheckoutConfig,
  WhopClientConfig,
  WhopMembership,
  WhopPayment,
  WhopWebhookEvent,
} from "./types.js"

/**
 * Whop API client for checkout and membership management.
 *
 * @example
 * ```typescript
 * const whop = createWhopClient({
 *   apiKey: process.env.WHOP_API_KEY!,
 *   appId: process.env.WHOP_APP_ID,
 *   webhookSecret: process.env.WHOP_WEBHOOK_SECRET,
 * })
 *
 * // Verify a webhook
 * const event = await whop.verifyWebhook(body, headers)
 *
 * // Get membership details
 * const membership = await whop.getMembership(membershipId)
 * ```
 */
export function createWhopClient(config: WhopClientConfig) {
  const baseUrl = "https://api.whop.com/v5"

  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${baseUrl}${path}`
    const headers = new Headers(options.headers)
    headers.set("Authorization", `Bearer ${config.apiKey}`)
    headers.set("Content-Type", "application/json")

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Whop API error (${response.status}): ${error}`)
    }

    return response.json()
  }

  return {
    config,

    /**
     * Get a payment by ID
     */
    async getPayment(paymentId: string): Promise<WhopPayment> {
      return request<WhopPayment>(`/payments/${paymentId}`)
    },

    /**
     * Get a membership by ID
     */
    async getMembership(membershipId: string): Promise<WhopMembership> {
      return request<WhopMembership>(`/memberships/${membershipId}`)
    },

    /**
     * List memberships for a user
     */
    async listMemberships(userId: string): Promise<WhopMembership[]> {
      const result = await request<{ data: WhopMembership[] }>(
        `/memberships?user_id=${userId}`
      )
      return result.data
    },

    /**
     * Cancel a membership
     */
    async cancelMembership(membershipId: string): Promise<WhopMembership> {
      return request<WhopMembership>(`/memberships/${membershipId}/cancel`, {
        method: "POST",
      })
    },

    /**
     * Verify and parse a webhook payload.
     * Uses Standard Webhooks specification.
     */
    async verifyWebhook(
      body: string,
      headers: Record<string, string>
    ): Promise<WhopWebhookEvent> {
      if (!config.webhookSecret) {
        throw new Error("Webhook secret is required for verification")
      }

      // Standard Webhooks verification
      const webhookId = headers["webhook-id"]
      const webhookTimestamp = headers["webhook-timestamp"]
      const webhookSignature = headers["webhook-signature"]

      if (!webhookId || !webhookTimestamp || !webhookSignature) {
        throw new Error("Missing webhook headers")
      }

      // Verify timestamp is within 5 minutes
      const timestamp = parseInt(webhookTimestamp, 10)
      const now = Math.floor(Date.now() / 1000)
      if (Math.abs(now - timestamp) > 300) {
        throw new Error("Webhook timestamp too old")
      }

      // Verify signature using HMAC-SHA256
      const signedContent = `${webhookId}.${webhookTimestamp}.${body}`
      const encoder = new TextEncoder()
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(config.webhookSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      )
      const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(signedContent)
      )
      const expectedSignature = btoa(
        String.fromCharCode(...new Uint8Array(signature))
      )

      // Compare signatures (constant-time comparison)
      const providedSignatures = webhookSignature.split(" ")
      const isValid = providedSignatures.some((sig) => {
        const [version, hash] = sig.split(",")
        return version === "v1" && hash === expectedSignature
      })

      if (!isValid) {
        throw new Error("Invalid webhook signature")
      }

      return JSON.parse(body) as WhopWebhookEvent
    },

    /**
     * Generate a checkout embed configuration
     */
    generateCheckoutConfig(options: WhopCheckoutConfig) {
      return {
        planId: options.planId,
        returnUrl: options.returnUrl,
        cancelUrl: options.cancelUrl,
        theme: options.theme,
        prefill: options.prefill,
        metadata: options.metadata,
      }
    },
  }
}

export type WhopClient = ReturnType<typeof createWhopClient>
