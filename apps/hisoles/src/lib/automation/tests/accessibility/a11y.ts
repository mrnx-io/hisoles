/**
 * Accessibility Tests
 * Basic accessibility checks using Stagehand extraction
 */

import { z } from "zod"

import { createStagehand } from "@/lib/automation/stagehand-factory"
import { type TestPage, testPages } from "../fixtures/devices"

export interface A11yViolation {
  id: string
  impact: "minor" | "moderate" | "serious" | "critical"
  description: string
}

export interface PageA11yResult {
  page: TestPage
  passed: boolean
  violations: A11yViolation[]
  violationCount: number
}

export interface A11yTestResult {
  success: boolean
  results: PageA11yResult[]
  totalViolations: number
  totalDuration: number
}

export async function runAccessibilityTests(
  baseUrl: string = process.env.TEST_BASE_URL ?? "http://localhost:3000",
  pages: readonly TestPage[] = testPages
): Promise<A11yTestResult> {
  const startTime = Date.now()
  const results: PageA11yResult[] = []

  const stagehand = createStagehand("max_success_stealth", {
    cacheDir: "cache/a11y-tests",
  })

  try {
    await stagehand.init()
    const browserPage = stagehand.context.pages()[0]

    for (const page of pages) {
      console.log(`Auditing accessibility: ${page}...`)
      const violations: A11yViolation[] = []

      try {
        const url = `${baseUrl}${page}`
        await browserPage.goto(url, { waitUntil: "domcontentloaded" })

        // Use Stagehand to check for common accessibility issues
        const a11yCheck = await stagehand.extract(
          "Check for accessibility issues on this page: Are there images without alt text? Are there form inputs without labels? Are there buttons or links without accessible text? Is there sufficient color contrast?",
          z.object({
            imagesWithoutAlt: z.boolean().describe("Are there images without alt text?"),
            inputsWithoutLabels: z.boolean().describe("Are there form inputs without labels?"),
            emptyButtons: z.boolean().describe("Are there buttons without accessible text?"),
            emptyLinks: z.boolean().describe("Are there links without accessible text?"),
            hasHeadingStructure: z
              .boolean()
              .describe("Does the page have proper heading structure (h1, h2, etc.)?"),
          })
        )

        // Convert checks to violations
        if (a11yCheck.imagesWithoutAlt) {
          violations.push({
            id: "img-alt",
            impact: "serious",
            description: "Images missing alt text",
          })
        }
        if (a11yCheck.inputsWithoutLabels) {
          violations.push({
            id: "input-label",
            impact: "serious",
            description: "Form inputs missing labels",
          })
        }
        if (a11yCheck.emptyButtons) {
          violations.push({
            id: "button-name",
            impact: "critical",
            description: "Buttons without accessible name",
          })
        }
        if (a11yCheck.emptyLinks) {
          violations.push({
            id: "link-name",
            impact: "serious",
            description: "Links without accessible name",
          })
        }
        if (!a11yCheck.hasHeadingStructure) {
          violations.push({
            id: "heading-order",
            impact: "moderate",
            description: "Missing proper heading structure",
          })
        }

        // Only fail on critical/serious violations
        const criticalViolations = violations.filter(
          (v) => v.impact === "critical" || v.impact === "serious"
        )

        results.push({
          page,
          passed: criticalViolations.length === 0,
          violations,
          violationCount: violations.length,
        })
      } catch (error) {
        results.push({
          page,
          passed: false,
          violations: [
            {
              id: "error",
              impact: "critical",
              description: error instanceof Error ? error.message : String(error),
            },
          ],
          violationCount: 1,
        })
      }
    }

    const allPassed = results.every((r) => r.passed)
    const totalViolations = results.reduce((sum, r) => sum + r.violationCount, 0)

    return { success: allPassed, results, totalViolations, totalDuration: Date.now() - startTime }
  } finally {
    await stagehand.close()
  }
}

// CLI runner
if (import.meta.main) {
  console.log("Running Accessibility Tests...")
  runAccessibilityTests()
    .then((result) => {
      console.log("\n=== Accessibility Test Results ===")
      console.log(`Success: ${result.success}`)
      console.log(`Total Violations: ${result.totalViolations}`)
      console.log(`Total Duration: ${result.totalDuration}ms\n`)
      for (const pageResult of result.results) {
        const status = pageResult.passed ? "✓" : "✗"
        console.log(`${status} ${pageResult.page} (${pageResult.violationCount} issues)`)
        if (pageResult.violations.length > 0) {
          for (const v of pageResult.violations) {
            const icon = v.impact === "critical" ? "🔴" : v.impact === "serious" ? "🟠" : "🟡"
            console.log(`  ${icon} [${v.impact}] ${v.id}: ${v.description}`)
          }
        }
      }
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error("Test failed:", error)
      process.exit(1)
    })
}
