"use server"

import { checkoutSchema } from "@/lib/schemas/checkout"

export interface CheckoutResult {
  success: boolean
  message?: string
  errors?: {
    email?: string[]
    name?: string[]
  }
}

export async function submitCheckout(formData: FormData): Promise<CheckoutResult> {
  const rawData = {
    email: formData.get("email"),
    name: formData.get("name"),
  }

  const result = checkoutSchema.safeParse(rawData)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In production, this would:
  // 1. Create order in database
  // 2. Process payment via Stripe
  // 3. Send confirmation email

  return {
    success: true,
    message: `Order confirmed for ${result.data.name}. Confirmation sent to ${result.data.email}.`,
  }
}
