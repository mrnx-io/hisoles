/**
 * Master Test Orchestrator
 * Runs all browser test suites in priority order
 */

import { runAccessibilityTests } from "./accessibility/a11y"
import { runCheckoutFlowTest } from "./journeys/checkout-flow"
import { runOfferConversionTest } from "./journeys/offer-conversion"
import { runPerformanceTests } from "./performance/lighthouse"
import { runVisualTests } from "./visual/pages.visual"

export interface TestSuiteResult {
  name: string
  priority: "P0" | "P1" | "P2" | "P3"
  success: boolean
  duration: number
}

export interface AllTestsResult {
  success: boolean
  suites: TestSuiteResult[]
  totalDuration: number
  summary: { passed: number; failed: number; total: number }
}

type SuiteConfig = {
  name: string
  priority: "P0" | "P1" | "P2" | "P3"
  run: () => Promise<{ success: boolean; totalDuration: number }>
}

export async function runAllTests(
  baseUrl: string = process.env.TEST_BASE_URL ?? "http://localhost:3000",
  options: { skipVisual?: boolean; skipPerformance?: boolean; skipA11y?: boolean } = {}
): Promise<AllTestsResult> {
  const startTime = Date.now()
  const suites: TestSuiteResult[] = []

  const suiteConfigs: SuiteConfig[] = [
    { name: "Checkout E2E Journey", priority: "P0", run: () => runCheckoutFlowTest(baseUrl) },
    {
      name: "Offer Conversion Journey",
      priority: "P1",
      run: () => runOfferConversionTest(baseUrl),
    },
  ]

  if (!options.skipVisual) {
    suiteConfigs.push({
      name: "Visual Regression",
      priority: "P1",
      run: () => runVisualTests(baseUrl),
    })
  }
  if (!options.skipPerformance) {
    suiteConfigs.push({
      name: "Performance",
      priority: "P2",
      run: () => runPerformanceTests(baseUrl),
    })
  }
  if (!options.skipA11y) {
    suiteConfigs.push({
      name: "Accessibility",
      priority: "P3",
      run: () => runAccessibilityTests(baseUrl),
    })
  }

  for (const config of suiteConfigs) {
    console.log(`\n${"=".repeat(50)}`)
    console.log(`Running [${config.priority}]: ${config.name}`)
    console.log("=".repeat(50))

    try {
      const result = await config.run()
      suites.push({
        name: config.name,
        priority: config.priority,
        success: result.success,
        duration: result.totalDuration,
      })
      console.log(`\n${result.success ? "✓ PASSED" : "✗ FAILED"} (${result.totalDuration}ms)`)
    } catch (error) {
      suites.push({ name: config.name, priority: config.priority, success: false, duration: 0 })
      console.log(`\n✗ ERROR: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const passed = suites.filter((s) => s.success).length
  const failed = suites.filter((s) => !s.success).length

  return {
    success: failed === 0,
    suites,
    totalDuration: Date.now() - startTime,
    summary: { passed, failed, total: suites.length },
  }
}

// CLI runner
if (import.meta.main) {
  console.log("╔══════════════════════════════════════════════════╗")
  console.log("║     COMPREHENSIVE BROWSER TEST SUITE             ║")
  console.log("╚══════════════════════════════════════════════════╝")

  const skipVisual = process.argv.includes("--skip-visual")
  const skipPerf = process.argv.includes("--skip-perf")
  const skipA11y = process.argv.includes("--skip-a11y")

  runAllTests(undefined, { skipVisual, skipPerformance: skipPerf, skipA11y })
    .then((result) => {
      console.log(`\n${"═".repeat(50)}`)
      console.log("                  FINAL SUMMARY")
      console.log("═".repeat(50))
      console.log(`Total Duration: ${result.totalDuration}ms`)
      console.log(`Suites Passed:  ${result.summary.passed}/${result.summary.total}`)
      console.log(`Suites Failed:  ${result.summary.failed}/${result.summary.total}\n`)

      for (const suite of result.suites) {
        const icon = suite.success ? "✓" : "✗"
        console.log(`  ${icon} [${suite.priority}] ${suite.name} (${suite.duration}ms)`)
      }

      console.log(`\n${"═".repeat(50)}`)
      console.log(
        result.success ? "               ALL TESTS PASSED!" : "            SOME TESTS FAILED"
      )
      console.log("═".repeat(50))

      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error("Fatal error:", error)
      process.exit(1)
    })
}
