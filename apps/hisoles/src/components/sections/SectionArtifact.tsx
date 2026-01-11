"use client"

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { useEffect, useRef } from "react"
import { KakemonoSection } from "@/components/layout/KakemonoSection"
import { useSpine } from "@/components/layout/SpineProvider"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

export function SectionArtifact() {
  const reducedMotion = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const { setTravelingDotSuppressed } = useSpine()
  const suppressedRef = useRef(false)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const shouldSuppress = v >= 0.08 && v <= 0.26
    if (shouldSuppress === suppressedRef.current) return
    suppressedRef.current = shouldSuppress
    setTravelingDotSuppressed(shouldSuppress)
  })

  useEffect(() => {
    return () => setTravelingDotSuppressed(false)
  }, [setTravelingDotSuppressed])

  const emergeScale = useTransform(scrollYProgress, [0.05, 0.25], [0.03, 1])
  const emergeOpacity = useTransform(scrollYProgress, [0.05, 0.16], [0, 1])

  const unzip = useTransform(scrollYProgress, [0.38, 0.72], [0, 1])
  const leftX = useTransform(unzip, [0, 1], [0, -90])
  const rightX = useTransform(unzip, [0, 1], [0, 90])
  const skinOpacity = useTransform(unzip, [0, 1], [1, 0])
  const annotationOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1])

  const proofOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1])
  const proofY = useTransform(scrollYProgress, [0.62, 0.78], [12, 0])

  return (
    <KakemonoSection id="artifact" bleed>
      <div ref={ref} className="relative z-20 h-[220svh]">
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
          {/* Artifact */}
          <motion.div
            style={{
              scale: emergeScale,
              opacity: emergeOpacity,
              WebkitMaskImage: "url(/insole-mask.svg)",
              maskImage: "url(/insole-mask.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
            className="relative h-[560px] w-[260px] md:h-[680px] md:w-[320px]"
          >
            {/* Inner core */}
            <div className="bg-persimmon absolute inset-0 overflow-hidden shadow-[0_25px_50px_var(--color-persimmon-25)]">
              <svg
                width="100%"
                height="100%"
                className="text-washi absolute inset-0 opacity-20 mix-blend-overlay"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="honeycomb"
                    x="0"
                    y="0"
                    width="20"
                    height="34"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M10 0 L20 8.5 L20 25.5 L10 34 L0 25.5 L0 8.5 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#honeycomb)" />
              </svg>

              <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
                <span className="k-kicker text-washi/70 block">Structural geometry</span>
                <span className="k-whisper text-washi/50 mt-1 block">
                  rebounds. doesn&apos;t mush.
                </span>
              </div>
            </div>

            {/* Outer skin splits along meridian */}
            <motion.div
              style={{ x: leftX, opacity: skinOpacity }}
              className="absolute inset-0 overflow-hidden shadow-2xl"
            >
              <div
                className="bg-charcoal absolute inset-0"
                style={{ clipPath: "inset(0 49% 0 0)" }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  clipPath: "inset(0 49% 0 0)",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--color-washi-08) 0, var(--color-washi-08) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, var(--color-washi-08) 0, var(--color-washi-08) 1px, transparent 1px, transparent 6px)",
                }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              style={{ x: rightX, opacity: skinOpacity }}
              className="absolute inset-0 overflow-hidden shadow-2xl"
            >
              <div
                className="bg-charcoal absolute inset-0"
                style={{ clipPath: "inset(0 0 0 49%)" }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  clipPath: "inset(0 0 0 49%)",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--color-washi-08) 0, var(--color-washi-08) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, var(--color-washi-08) 0, var(--color-washi-08) 1px, transparent 1px, transparent 6px)",
                }}
                aria-hidden="true"
              />
            </motion.div>

            <div
              className="bg-washi/10 absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
              aria-hidden="true"
            />
          </motion.div>

          {/* Callouts (honest) */}
          <motion.div
            style={{ opacity: annotationOpacity }}
            className="absolute top-1/2 left-6 max-w-[240px] -translate-y-1/2 md:left-20"
          >
            <p className="k-kicker">Activated charcoal weave</p>
            <p className="k-whisper mt-2">breathable · odor-resistant</p>
            <p className="k-title k-title-md mt-4">Hidden support.</p>
          </motion.div>

          <motion.div
            style={{ opacity: annotationOpacity }}
            className="absolute right-6 bottom-28 text-right md:right-20"
          >
            <p className="k-kicker">Under pressure</p>
            <p className="k-whisper text-sumi mt-2">stays springy</p>
            <p className="k-whisper mt-2">geometry &gt; flat foam</p>
          </motion.div>

          {/* Proof object */}
          <motion.div
            style={{ opacity: proofOpacity, y: proofY }}
            className="absolute bottom-10 left-1/2 w-[min(92vw,520px)] -translate-x-1/2"
          >
            <div className="bg-washi border-stone/10 overflow-hidden border shadow-xl">
              <div className="border-stone/10 flex items-baseline justify-between border-b p-4">
                <p className="k-whisper">Proof</p>
                <p className="k-whisper">squeeze → rebound</p>
              </div>
              <div className="bg-stone/5 relative aspect-[16/9]">
                <video
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                  src="/squeeze-loop.mp4"
                  muted
                  playsInline
                  loop
                  autoPlay={!reducedMotion}
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(26,26,26,0.25)_100%)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </KakemonoSection>
  )
}
