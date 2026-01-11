import { z } from "zod"

// Shopify uses GraphQL Global IDs (gid://shopify/...)
export const ShopifyGidSchema = z.string().regex(/^gid:\/\/shopify\/\w+\/\d+$/)
export type ShopifyGid = z.infer<typeof ShopifyGidSchema>

export const ShopifyMoneySchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
})
export type ShopifyMoney = z.infer<typeof ShopifyMoneySchema>

export const ShopifyAddressSchema = z.object({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  provinceCode: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
})
export type ShopifyAddress = z.infer<typeof ShopifyAddressSchema>

export const ShopifyLineItemInputSchema = z.object({
  variantId: ShopifyGidSchema,
  quantity: z.number().int().positive(),
})
export type ShopifyLineItemInput = z.infer<typeof ShopifyLineItemInputSchema>

export const ShopifyOrderInputSchema = z.object({
  lineItems: z.array(ShopifyLineItemInputSchema),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  shippingAddress: ShopifyAddressSchema.optional(),
  billingAddress: ShopifyAddressSchema.optional(),
  financialStatus: z.enum(["PENDING", "AUTHORIZED", "PAID"]).optional(),
  tags: z.array(z.string()).optional(),
  note: z.string().optional(),
})
export type ShopifyOrderInput = z.infer<typeof ShopifyOrderInputSchema>

export const ShopifyOrderSchema = z.object({
  id: ShopifyGidSchema,
  name: z.string(),
  email: z.string().email().optional(),
  createdAt: z.string(),
  displayFinancialStatus: z.string().optional(),
  displayFulfillmentStatus: z.string().optional(),
  totalPrice: ShopifyMoneySchema.optional(),
})
export type ShopifyOrder = z.infer<typeof ShopifyOrderSchema>

export const ShopifyFulfillmentOrderSchema = z.object({
  id: ShopifyGidSchema,
  status: z.string(),
  assignedLocation: z
    .object({
      name: z.string(),
    })
    .optional(),
})
export type ShopifyFulfillmentOrder = z.infer<typeof ShopifyFulfillmentOrderSchema>

export const ShopifyUserErrorSchema = z.object({
  field: z.array(z.string()).optional(),
  message: z.string(),
})
export type ShopifyUserError = z.infer<typeof ShopifyUserErrorSchema>

export type ShopifyClientConfig = {
  shop: string
  accessToken: string
  apiVersion?: string
}
