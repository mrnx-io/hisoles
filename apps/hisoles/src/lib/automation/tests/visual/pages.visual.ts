/**
 * Visual Regression Tests
 * Captures screenshots of all pages at multiple viewports
 */

import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { createStagehand } from "@/lib/automation/stagehand-factory"
import { type DeviceConfig, type TestPage, testDevices, testPages } from "../fixtures/devices"

export interface VisualTestResult {
  success: boolean
  screenshots: {
    page: TestPage
    device: string
    path: string
    captured: boolean
    error?: string
  }[]
  totalDuration: number
}

const SCREENSHOT_DIR = "test-results/visual-snapshots"

export async function runVisualTests(
  baseUrl: string = process.env.TEST_BASE_URL ?? "http://localhost:3000",
  devices: DeviceConfig[] = testDevices,
  pages: readonly TestPage[] = testPages
): Promise<VisualTestResult> {
  const startTime = Date.now()
  const screenshots: VisualTestResult["screenshots"] = []

  const stagehand = createStagehand("max_success_stealth", {
    cacheDir: "cache/visual-tests",
  })

  try {
    await stagehand.init()
    const browserPage = stagehand.context.pages()[0]

    // Ensure screenshot directory exists
    mkdirSync(SCREENSHOT_DIR, { recursive: true })

    for (const page of pages) {
      for (const device of devices) {
        console.log(`Capturing: ${page} on ${device.name}...`)

        try {
          // Set viewport
          await browserPage.setViewportSize(device.viewport.width, device.viewport.height)

          // Navigate to page
          const url = `${baseUrl}${page}`
          await browserPage.goto(url, { waitUntil: "networkidle" })

          // Capture screenshot
          const pageName = page === "/" ? "home" : page.replace(/\//g, "-").slice(1)
          const filename = `${pageName}-${device.name.toLowerCase()}.png`
          const filepath = join(SCREENSHOT_DIR, filename)

          const screenshot = await browserPage.screenshot({
            fullPage: true,
            type: "png",
            path: filepath,
          })
          if (screenshot) writeFileSync(filepath, screenshot)

          screenshots.push({ page, device: device.name, path: filepath, captured: true })
        } catch (error) {
          screenshots.push({
            page,
            device: device.name,
            path: "",
            captured: false,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      }
    }

    const allCaptured = screenshots.every((s) => s.captured)
    return { success: allCaptured, screenshots, totalDuration: Date.now() - startTime }
  } finally {
    await stagehand.close()
  }
}

// CLI runner
if (import.meta.main) {
  console.log("Running Visual Regression Tests...")
  runVisualTests()
    .then((result) => {
      console.log("\n=== Visual Test Results ===")
      console.log(`Success: ${result.success}`)
      console.log(`Total Duration: ${result.totalDuration}ms`)
      console.log(`Screenshots: ${result.screenshots.length}\n`)
      for (const screenshot of result.screenshots) {
        const status = screenshot.captured ? "✓" : "✗"
        console.log(`${status} ${screenshot.page} (${screenshot.device})`)
        if (screenshot.captured) {
          console.log(`  Saved: ${screenshot.path}`)
        } else {
          console.log(`  Error: ${screenshot.error}`)
        }
      }
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error("Test failed:", error)
      process.exit(1)
    })
}
