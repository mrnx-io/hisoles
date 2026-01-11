/**
 * Device configurations for browser testing
 * Used across visual regression, E2E, and cross-device tests
 */

export interface DeviceConfig {
  name: string
  viewport: { width: number; height: number }
  userAgent?: string
  deviceScaleFactor?: number
  isMobile?: boolean
  hasTouch?: boolean
}

export const Desktop: DeviceConfig = {
  name: "Desktop",
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
}

export const Mobile: DeviceConfig = {
  name: "iPhone-14",
  viewport: { width: 390, height: 844 },
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
}

export const Tablet: DeviceConfig = {
  name: "iPad-Pro",
  viewport: { width: 1024, height: 1366 },
  userAgent:
    "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
}

export const testDevices: DeviceConfig[] = [Desktop, Mobile]

export const allDevices: DeviceConfig[] = [Desktop, Mobile, Tablet]

export const testPages = ["/", "/offer", "/checkout", "/checkout/complete"] as const

export type TestPage = (typeof testPages)[number]
