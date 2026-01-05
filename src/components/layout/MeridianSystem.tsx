"use client"

import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import { CHAPTERS } from "@/components/layout/chapters"
import { useSpine } from "@/components/layout/SpineProvider"
import { DELAY_MA, DURATION_ATTENTION, EASE_EMERGE, SPRING_PRECISE } from "@/lib/animation"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const DETACH_SCROLL_PX = 120

type Marker = { id: string; p: number }

export function MeridianSystem() {
  const reducedMotion = usePrefersReducedMotion()
  const { scrollY } = useScroll()

  const { logoDotTopY, travelingDotSuppressed, positionReady } = useSpine()

  const [viewportHeight, setViewportHeight] = useState(0)
  const [scrollMax, setScrollMax] = useState(0)
  const [markers, setMarkers] = useState<Marker[]>([])

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight
      const max = Math.max(0, document.documentElement.scrollHeight - vh)
      setViewportHeight(vh)
      setScrollMax(max)

      if (max <= 0) return

      // Equal spacing: distribute dots evenly along the line
      const n = CHAPTERS.length
      const nextMarkers: Marker[] = CHAPTERS.map((c, index) => ({
        id: c.id,
        p: n > 1 ? index / (n - 1) : 0,
      }))

      setMarkers(nextMarkers)
    }

    compute()

    const ro = new ResizeObserver(compute)
    ro.observe(document.documentElement)

    window.addEventListener("load", compute)

    return () => {
      ro.disconnect()
      window.removeEventListener("load", compute)
    }
  }, [])

  const travelEndPx = Math.max(scrollMax, DETACH_SCROLL_PX + 1)
  const endY = viewportHeight ? viewportHeight * 0.94 : logoDotTopY

  const dotTop = useTransform(
    scrollY,
    [0, DETACH_SCROLL_PX, travelEndPx],
    [logoDotTopY, logoDotTopY, endY]
  )

  const progress = useTransform(scrollY, [DETACH_SCROLL_PX, travelEndPx], [0, 1])
  // Matched spring for progress line - fluid tracking
  const smoothProgress = useSpring(progress, {
    ...SPRING_PRECISE,
    restSpeed: 0.001,
    restDelta: 0.0001,
  })
  const renderedProgress = reducedMotion ? progress : smoothProgress

  // Line starts below the "ı" letter (dot + gap + letter height)
  const lineStartOffset = 26
  const lineStyle = useMemo(
    () => ({
      marginTop: logoDotTopY + lineStartOffset,
      height: `calc(100% - ${logoDotTopY + lineStartOffset}px)`,
    }),
    [logoDotTopY]
  )

  return (
    <>
      {/* MERIDIAN LINE (structure) */}
      <div
        className="pointer-events-none fixed inset-0 z-[15] flex justify-center"
        aria-hidden="true"
      >
        <div className="relative w-px" style={lineStyle}>
          {/* Base line */}
          <div className="bg-stone absolute inset-0 opacity-15" />

          {/* Ink progress - gradient fade */}
          <motion.div
            style={{ scaleY: renderedProgress, transformOrigin: "top" }}
            className="from-sumi/25 via-sumi/20 to-sumi/15 absolute inset-0 bg-gradient-to-b"
          />

          {/* Chapter stitches - subtle position markers (skip first, traveling dot shows active state) */}
          {markers.slice(1).map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * DELAY_MA,
                duration: DURATION_ATTENTION,
                ease: EASE_EMERGE,
              }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${m.p * 100}%` }}
            >
              {/* Simple marker dot - always subtle gray */}
              <div className="bg-stone/20 h-[4px] w-[4px] rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRAVELING DOT */}
      {positionReady && (
        <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
          <motion.div
            animate={{ opacity: travelingDotSuppressed ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              style={{ top: dotTop }}
              className="bg-persimmon absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full shadow-[0_0_2px_0.5px_rgba(232,93,4,0.6),0_0_4px_1px_rgba(232,93,4,0.3),0_0_6px_2px_rgba(232,93,4,0.1)]"
            />
          </motion.div>
        </div>
      )}
    </>
  )
}
