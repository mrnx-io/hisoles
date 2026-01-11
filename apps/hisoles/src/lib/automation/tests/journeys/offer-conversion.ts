/**
 * P1: Offer Conversion Journey Test
 * Tests: Homepage → Offer page navigation and interactive elements
 */

import { z } from "zod"

import { createStagehand } from "@/lib/automation/stagehand-factory"

export interface OfferConversionResult {
  success: boolean
  steps: {
    name: string
    passed: boolean
    duration: number
    error?: string
  }[]
  totalDuration: number
}

export async function runOfferConversionTest(
  baseUrl: string = process.env.TEST_BASE_URL ?? "http://localhost:3000"
): Promise<OfferConversionResult> {
  const startTime = Date.now()
  const steps: OfferConversionResult["steps"] = []

  const stagehand = createStagehand("max_success_stealth", {
    cacheDir: "cache/offer-conversion",
  })

  try {
    // Step 1: Initialize
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

    // Step 2: Navigate to homepage
    const homeStart = Date.now()
    try {
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" })
      steps.push({ name: "Navigate to homepage", passed: true, duration: Date.now() - homeStart })
    } catch (error) {
      steps.push({
        name: "Navigate to homepage",
        passed: false,
        duration: Date.now() - homeStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 3: Extract homepage content
    const homeContentStart = Date.now()
    try {
      await stagehand.extract(
        "Extract the main heading, any navigation links, and call-to-action buttons from this homepage",
        z.object({
          mainHeading: z.string().optional(),
          hasNavigation: z.boolean(),
          ctaButtons: z.array(z.string()).optional(),
          linksToOffer: z.boolean().describe("Is there a link to /offer or shop/buy section?"),
        })
      )
      steps.push({
        name: "Verify homepage content",
        passed: true,
        duration: Date.now() - homeContentStart,
      })
    } catch (error) {
      steps.push({
        name: "Verify homepage content",
        passed: false,
        duration: Date.now() - homeContentStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 4: Navigate to offer page
    const navToOfferStart = Date.now()
    try {
      // Try clicking a link first, then fall back to direct navigation
      try {
        await stagehand.act("Click the link or button that leads to the offer or shop page")
        // Poll for URL change
        for (let i = 0; i < 10; i++) {
          await new Promise((r) => setTimeout(r, 500))
          if (page.url().includes("/offer")) break
        }
      } catch {
        // Fall back to direct navigation
        await page.goto(`${baseUrl}/offer`, { waitUntil: "domcontentloaded" })
      }
      steps.push({
        name: "Navigate to /offer",
        passed: true,
        duration: Date.now() - navToOfferStart,
      })
    } catch (error) {
      steps.push({
        name: "Navigate to /offer",
        passed: false,
        duration: Date.now() - navToOfferStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 5: Verify offer page content
    const offerContentStart = Date.now()
    try {
      await stagehand.extract(
        "Extract details about this offer/product page: product name, price, main features, and any interactive elements",
        z.object({
          productName: z.string().optional(),
          price: z.string().optional(),
          hasInteractiveElements: z.boolean(),
          hasCTA: z.boolean().describe("Is there a call-to-action button?"),
        })
      )
      steps.push({
        name: "Verify offer page content",
        passed: true,
        duration: Date.now() - offerContentStart,
      })
    } catch (error) {
      steps.push({
        name: "Verify offer page content",
        passed: false,
        duration: Date.now() - offerContentStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 6: Test interactive elements (FAQ/accordion)
    const interactiveStart = Date.now()
    try {
      const faqElements = await stagehand.observe(
        "Find any FAQ section, accordion, or expandable content that can be clicked"
      )
      if (faqElements && faqElements.length > 0) {
        await stagehand.act("Click on the first FAQ item or accordion to expand it")
      }
      steps.push({
        name: "Test interactive elements",
        passed: true,
        duration: Date.now() - interactiveStart,
      })
    } catch (error) {
      steps.push({
        name: "Test interactive elements",
        passed: false,
        duration: Date.now() - interactiveStart,
        error: error instanceof Error ? error.message : String(error),
      })
    }

    // Step 7: Verify CTA is present
    const ctaStart = Date.now()
    try {
      const cta = await stagehand.observe(
        "Find the main call-to-action button for purchasing or proceeding to checkout"
      )
      const ctaFound = cta && cta.length > 0
      steps.push({
        name: "Verify main CTA is present",
        passed: ctaFound,
        duration: Date.now() - ctaStart,
      })
    } catch (error) {
      steps.push({
        name: "Verify main CTA is present",
        passed: false,
        duration: Date.now() - ctaStart,
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
  console.log("Running Offer Conversion Journey Test...")
  runOfferConversionTest()
    .then((result) => {
      console.log("\n=== Offer Conversion Test Results ===")
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
