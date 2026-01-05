/**
 * =============================================================================
 * hisoles Color System
 *
 * JAVASCRIPT MIRROR OF globals.css
 * These values MUST match src/app/globals.css @theme block.
 *
 * Why this file exists:
 * - Canvas APIs need literal color strings (no CSS variables)
 * - ImageResponse (next/og) doesn't support CSS variables or OKLCH
 * - PWA manifest requires literal hex values
 * =============================================================================
 */

// =============================================================================
// Brand Colors (HEX format for Canvas/ImageResponse compatibility)
// =============================================================================

export const COLORS = {
  /** Warm cream - washi paper background */
  washi: "#FCFAF5",

  /** Ink black - primary text */
  sumi: "#1A1A1A",

  /** Orange accent - CTAs, highlights */
  persimmon: "#E85D04",

  /** Medium gray - secondary text */
  stone: "#4A4A4A",

  /** Dark gray - tertiary elements */
  charcoal: "#222222",
} as const

export type ColorName = keyof typeof COLORS
