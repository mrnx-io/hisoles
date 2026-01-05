"use client"

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

/**
 * Animation timing constants (match CSS design tokens)
 */
export const DURATION_ATTENTION = 0.6 // --duration-attention: 600ms
export const DURATION_WHISPER = 0.4 // --duration-whisper: 400ms
export const DELAY_MA = 0.08 // --delay-ma: 80ms

/**
 * Standard easing curves
 */
export const EASE_EMERGE: [number, number, number, number] = [0.16, 1, 0.3, 1] // circOut-like
export const EASE_RETREAT: [number, number, number, number] = [0.87, 0, 0.13, 1] // expoOut-like

/**
 * Spring physics presets
 */
export const SPRING_SCROLL = { damping: 50, stiffness: 400 } // Standard scroll-linked
export const SPRING_PRECISE = { damping: 50, stiffness: 400, mass: 0.05 } // Precise tracking
export const SPRING_DRAWER = { damping: 25, stiffness: 200 } // Drawer/modal animations

/**
 * Hook for scroll-to-section navigation
 * Respects reduced motion preference
 */
export function useScrollToSection() {
  const reducedMotion = usePrefersReducedMotion()

  return (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
  }
}
