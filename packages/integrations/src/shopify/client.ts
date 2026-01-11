import type {
  ShopifyClientConfig,
  ShopifyFulfillmentOrder,
  ShopifyOrder,
  ShopifyOrderInput,
  ShopifyUserError,
} from "./types.js"

const DEFAULT_API_VERSION = "2026-01"

type GraphQLResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

/**
 * Shopify GraphQL Admin API client.
 * Uses the latest 2026-01 API version with GraphQL-first approach.
 *
 * @example
 * ```typescript
 * const shopify = createShopifyClient({
 *   shop: "your-store.myshopify.com",
 *   accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
 * })
 *
 * // Create an order
 * const order = await shopify.createOrder({
 *   lineItems: [
 *     { variantId: "gid://shopify/ProductVariant/123", quantity: 2 }
 *   ],
 *   email: "customer@example.com",
 *   financialStatus: "PAID",
 * })
 *
 * // Get fulfillment orders
 * const fulfillmentOrders = await shopify.getFulfillmentOrders(order.id)
 * ```
 */
export function createShopifyClient(config: ShopifyClientConfig) {
  const apiVersion = config.apiVersion ?? DEFAULT_API_VERSION
  const baseUrl = `https://${config.shop}/admin/api/${apiVersion}/graphql.json`

  async function graphql<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": config.accessToken,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Shopify API error (${response.status}): ${error}`)
    }

    const json = (await response.json()) as GraphQLResponse<T>

    if (json.errors?.length) {
      throw new Error(`Shopify GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`)
    }

    if (!json.data) {
      throw new Error("No data returned from Shopify API")
    }

    return json.data
  }

  function handleUserErrors(errors: ShopifyUserError[] | undefined | null) {
    if (errors?.length) {
      const messages = errors.map((e) => {
        const field = e.field?.join(".") ?? "unknown"
        return `${field}: ${e.message}`
      })
      throw new Error(`Shopify validation errors: ${messages.join("; ")}`)
    }
  }

  return {
    config,
    apiVersion,

    /**
     * Execute a raw GraphQL query
     */
    graphql,

    /**
     * Create an order using the orderCreate mutation
     */
    async createOrder(input: ShopifyOrderInput): Promise<ShopifyOrder> {
      const mutation = `
        mutation orderCreate($input: OrderInput!) {
          orderCreate(input: $input) {
            order {
              id
              name
              email
              createdAt
              displayFinancialStatus
              displayFulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `

      type Response = {
        orderCreate: {
          order: ShopifyOrder | null
          userErrors: ShopifyUserError[]
        }
      }

      const data = await graphql<Response>(mutation, {
        input: {
          lineItems: input.lineItems.map((li) => ({
            variantId: li.variantId,
            quantity: li.quantity,
          })),
          email: input.email,
          phone: input.phone,
          shippingAddress: input.shippingAddress,
          billingAddress: input.billingAddress,
          financialStatus: input.financialStatus,
          tags: input.tags,
          note: input.note,
        },
      })

      handleUserErrors(data.orderCreate.userErrors)

      if (!data.orderCreate.order) {
        throw new Error("Order creation failed with no error details")
      }

      return data.orderCreate.order
    },

    /**
     * Get an order by ID
     */
    async getOrder(orderId: string): Promise<ShopifyOrder> {
      const query = `
        query getOrder($id: ID!) {
          order(id: $id) {
            id
            name
            email
            createdAt
            displayFinancialStatus
            displayFulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      `

      type Response = { order: ShopifyOrder | null }
      const data = await graphql<Response>(query, { id: orderId })

      if (!data.order) {
        throw new Error(`Order not found: ${orderId}`)
      }

      return data.order
    },

    /**
     * Get fulfillment orders for an order
     */
    async getFulfillmentOrders(orderId: string): Promise<ShopifyFulfillmentOrder[]> {
      const query = `
        query getFulfillmentOrders($orderId: ID!) {
          order(id: $orderId) {
            fulfillmentOrders(first: 10) {
              nodes {
                id
                status
                assignedLocation {
                  name
                }
              }
            }
          }
        }
      `

      type Response = {
        order: {
          fulfillmentOrders: {
            nodes: ShopifyFulfillmentOrder[]
          }
        } | null
      }

      const data = await graphql<Response>(query, { orderId })

      if (!data.order) {
        throw new Error(`Order not found: ${orderId}`)
      }

      return data.order.fulfillmentOrders.nodes
    },

    /**
     * Submit a fulfillment request for a fulfillment order (3PL pattern)
     */
    async submitFulfillmentRequest(fulfillmentOrderId: string): Promise<ShopifyFulfillmentOrder> {
      const mutation = `
        mutation submitFulfillmentRequest($id: ID!) {
          fulfillmentOrderSubmitFulfillmentRequest(fulfillmentOrderId: $id) {
            submittedFulfillmentOrder {
              id
              status
              assignedLocation {
                name
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `

      type Response = {
        fulfillmentOrderSubmitFulfillmentRequest: {
          submittedFulfillmentOrder: ShopifyFulfillmentOrder | null
          userErrors: ShopifyUserError[]
        }
      }

      const data = await graphql<Response>(mutation, { id: fulfillmentOrderId })
      handleUserErrors(data.fulfillmentOrderSubmitFulfillmentRequest.userErrors)

      if (!data.fulfillmentOrderSubmitFulfillmentRequest.submittedFulfillmentOrder) {
        throw new Error("Fulfillment request failed with no error details")
      }

      return data.fulfillmentOrderSubmitFulfillmentRequest.submittedFulfillmentOrder
    },

    /**
     * Create a fulfillment (merchant-managed pattern)
     */
    async createFulfillment(
      fulfillmentOrderId: string,
      options?: {
        trackingNumber?: string
        trackingCompany?: string
        trackingUrl?: string
        notifyCustomer?: boolean
      }
    ): Promise<{ id: string; status: string }> {
      const mutation = `
        mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
          fulfillmentCreateV2(fulfillment: $fulfillment) {
            fulfillment {
              id
              status
            }
            userErrors {
              field
              message
            }
          }
        }
      `

      type Response = {
        fulfillmentCreateV2: {
          fulfillment: { id: string; status: string } | null
          userErrors: ShopifyUserError[]
        }
      }

      const trackingInfo = options?.trackingNumber
        ? {
            number: options.trackingNumber,
            company: options.trackingCompany,
            url: options.trackingUrl,
          }
        : undefined

      const data = await graphql<Response>(mutation, {
        fulfillment: {
          lineItemsByFulfillmentOrder: [
            { fulfillmentOrderId, fulfillmentOrderLineItems: [] },
          ],
          notifyCustomer: options?.notifyCustomer ?? true,
          trackingInfo,
        },
      })

      handleUserErrors(data.fulfillmentCreateV2.userErrors)

      if (!data.fulfillmentCreateV2.fulfillment) {
        throw new Error("Fulfillment creation failed with no error details")
      }

      return data.fulfillmentCreateV2.fulfillment
    },
  }
}

export type ShopifyClient = ReturnType<typeof createShopifyClient>
