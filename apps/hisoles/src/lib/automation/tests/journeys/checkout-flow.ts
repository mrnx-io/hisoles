/**
 * P0: Checkout E2E Journey Test
 * Critical path: /offer → CTA click → /checkout → Whop embed verification
 */

import { z } from "zod"

import { createStagehand } from "@/lib/automation/stagehand-factory"

export interface CheckoutFlowResult {
  success: boolean
  steps: {
    name: string
    passed: boolean
    duration: number
    error?: string
  }[]
  totalDuration: number
}

export async function runCheckoutFlowTest(
  baseUrl: string = process.env.TEST_BASE_URL ?? "http://localhost:3000"
): Promise<CheckoutFlowResult> {
  const startTime = Date.now()
  const steps: CheckoutFlowResult["steps"] = []

  const stagehand = createStagehand("max_success_stealth", {
    cacheDir: "cache/checkout-flow",
  })

  try {
    // Step 1: Initialize Stagehand
    const initStart = Date.now()
    try {
      await stagehand.init()
      steps.push({
        name: "Initialize browser session",
        passed: true,
        duration: Date.now() - initStart,
      })
    } catch (error) {
      steps.push({
        name: "Initialize browser session",
        passed: false,
        duration: Date.now() - initStart,
        error: error instanceof Error ? error.message : String(error),
      })
      return { success: false, steps, totalDuration: Date.now() - startTime }
    }

    const page = stagehand.context.pages()[0]

    // Step 2: Navigate to offer page
    const navStart = Date.now()
    try {
      await page.goto(`${baseUrl}/offer`, { waitUntil: "domcontentloaded" })
      const url = page.url()
      if (!url.includes("/offer")) throw new Error(`Expected /offer, got ${url}`)
      steps.push({ name: "Navigate to /offer", passed: true, duration: Date.now() - navStart })
    } catch (error) {
      steps.push({
        name: "Navigate to /offer",
        passed: false,
        duration: Date.now() - navStart,
        error: error instanceof Error ? error.message : String(error),
      })
      return { success: false, steps, totalDuration: Date.now() - startTime }
    }

    // Step 3: Find and verify CTA button exists
    const ctaStart = Date.now()
    try {
      const elements = await stagehand.observe(
        "Find the main call-to-action button that leads to checkout or purchase"
      )
      if (!elements || elements.length === 0) {
        throw new Error("No CTA button found")
      }
      steps.push({ name: "Locate CTA button", passed: true, duration: Date.now() - ctaStart })
    } catch (error) {
      steps.push({
        name: "Locate CTA button",
        passed: false,
        duration: Date.now() - ctaStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 4: Click CTA and navigate to checkout
    const clickStart = Date.now()
    try {
      await stagehand.act("Click the main call-to-action button to proceed to checkout")
      // Poll for URL change
      for (let i = 0; i < 20; i++) {
        await new Promise((r) => setTimeout(r, 500))
        if (page.url().includes("/checkout")) break
      }
      const url = page.url()
      if (!url.includes("/checkout")) throw new Error(`Expected /checkout, got ${url}`)
      steps.push({
        name: "Click CTA → Navigate to checkout",
        passed: true,
        duration: Date.now() - clickStart,
      })
    } catch (error) {
      steps.push({
        name: "Click CTA → Navigate to checkout",
        passed: false,
        duration: Date.now() - clickStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 5: Verify checkout page loads
    const checkoutStart = Date.now()
    try {
      const content = await stagehand.extract(
        "Extract information about the checkout page - is there a checkout form, payment section, or product summary visible?",
        z.object({
          hasCheckoutContent: z.boolean().describe("Is checkout content visible?"),
          pageTitle: z.string().optional().describe("Page title or main heading"),
          hasPaymentSection: z
            .boolean()
            .optional()
            .describe("Is there a payment/checkout section?"),
        })
      )
      if (!content.hasCheckoutContent) {
        throw new Error("Checkout content not found")
      }
      steps.push({
        name: "Verify checkout page content",
        passed: true,
        duration: Date.now() - checkoutStart,
      })
    } catch (error) {
      steps.push({
        name: "Verify checkout page content",
        passed: false,
        duration: Date.now() - checkoutStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 6: Verify checkout elements exist
    const embedStart = Date.now()
    try {
      const frames = page.frames()
      const iframeCount = await page.locator("iframe").count()
      const hasEmbed = frames.length > 1 || iframeCount > 0
      const checkoutElements = await page.locator('[data-checkout], [class*="checkout"]').count()
      steps.push({
        name: "Check for checkout embed/iframe",
        passed: hasEmbed || checkoutElements > 0,
        duration: Date.now() - embedStart,
      })
    } catch (error) {
      steps.push({
        name: "Check for checkout embed/iframe",
        passed: false,
        duration: Date.now() - embedStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    const allPassed = steps.every((s) => s.passed)
    return { success: allPassed, steps, totalDuration: Date.now() - startTime }
  } finally {
    await stagehand.close()
  }
}

// CLI runner
if (import.meta.main) {
  console.log("Running Checkout Flow E2E Test...")
  runCheckoutFlowTest()
    .then((result) => {
      console.log("\n=== Checkout Flow Test Results ===")
      console.log(`Success: ${result.success}`)
      console.log(`Total Duration: ${result.totalDuration}ms\n`)
      for (const step of result.steps) {
        const status = step.passed ? "✓" : "✗"
        console.log(`${status} ${step.name} (${step.duration}ms)`)
        if (step.error) console.log(`  Error: ${step.error}`)
      }
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error("Test failed:", error)
      process.exit(1)
    })
}
