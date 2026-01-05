import { z } from "zod"

export const checkoutSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
