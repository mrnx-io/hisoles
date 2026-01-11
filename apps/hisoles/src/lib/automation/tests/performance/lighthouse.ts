/**
 * Performance Tests
 * Measures load times and basic performance metrics
 */

import { createStagehand } from "@/lib/automation/stagehand-factory"
import type { TestPage } from "../fixtures/devices"

export interface PerformanceMetrics {
  loadTime: number
  domContentLoaded?: number
}

export interface PagePerformanceResult {
  page: TestPage
  metrics: PerformanceMetrics
  passed: boolean
  violations: string[]
}

export interface PerformanceTestResult {
  success: boolean
  results: PagePerformanceResult[]
  totalDuration: number
}

// Performance thresholds
const THRESHOLDS = {
  loadTime: 5000, // 5 seconds max load time
}

export async function runPerformanceTests(
  baseUrl: string = process.env.TEST_BASE_URL ?? "http://localhost:3000",
  pages: readonly TestPage[] = ["/offer", "/checkout"]
): Promise<PerformanceTestResult> {
  const startTime = Date.now()
  const results: PagePerformanceResult[] = []

  const stagehand = createStagehand("max_speed_repeatable", {
    cacheDir: "cache/performance-tests",
  })

  try {
    await stagehand.init()
    const browserPage = stagehand.context.pages()[0]

    for (const page of pages) {
      console.log(`Measuring performance: ${page}...`)
      const violations: string[] = []

      try {
        const url = `${baseUrl}${page}`
        const loadStart = Date.now()

        await browserPage.goto(url, { waitUntil: "load" })

        const loadTime = Date.now() - loadStart

        const metrics: PerformanceMetrics = { loadTime }

        // Check against thresholds
        if (loadTime > THRESHOLDS.loadTime) {
          violations.push(`Load time ${loadTime}ms exceeds ${THRESHOLDS.loadTime}ms threshold`)
        }

        results.push({
          page,
          metrics,
          passed: violations.length === 0,
          violations,
        })
      } catch (error) {
        results.push({
          page,
          metrics: { loadTime: 0 },
          passed: false,
          violations: [error instanceof Error ? error.message : String(error)],
        })
      }
    }

    const allPassed = results.every((r) => r.passed)
    return { success: allPassed, results, totalDuration: Date.now() - startTime }
  } finally {
    await stagehand.close()
  }
}

// CLI runner
if (import.meta.main) {
  console.log("Running Performance Tests...")
  runPerformanceTests()
    .then((result) => {
      console.log("\n=== Performance Test Results ===")
      console.log(`Success: ${result.success}`)
      console.log(`Total Duration: ${result.totalDuration}ms\n`)
      for (const pageResult of result.results) {
        const status = pageResult.passed ? "✓" : "✗"
        console.log(`${status} ${pageResult.page}`)
        console.log(`  Load Time: ${pageResult.metrics.loadTime}ms`)
        if (pageResult.violations.length > 0) {
          console.log("  Violations:")
          for (const v of pageResult.violations) {
            console.log(`    - ${v}`)
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
