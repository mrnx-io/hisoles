"use client"

import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

interface ScrollComparisonProps {
  freshImageUrl: string
  deadImageUrl: string
  freshLabel?: string
  deadLabel?: string
}

export function ScrollComparison({
  freshImageUrl,
  deadImageUrl,
  freshLabel = "Hour 1",
  deadLabel = "Hour 12",
}: ScrollComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const maskWidth = useTransform(scrollYProgress, [0.1, 0.9], ["100%", "0%"])
  const linePosition = useTransform(scrollYProgress, [0.1, 0.9], ["100%", "0%"])

  return (
    <div ref={containerRef} className="relative h-[250svh] w-full">
      <div className="bg-stone/5 sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <div className="bg-sumi border-stone/10 relative mx-6 aspect-[16/9] w-full max-w-5xl border shadow-2xl md:aspect-[2.35/1]">
          {/* DEAD (under) */}
          <div className="absolute inset-0">
            <Image
              src={deadImageUrl}
              alt="Dead foam"
              fill
              className="object-cover blur-[2px] brightness-[0.4] grayscale"
            />
            <div className="bg-sumi/40 absolute inset-0 mix-blend-multiply" />
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-persimmon mb-2 block font-mono text-[10px] tracking-widest uppercase">
                {deadLabel}
              </span>
              <span className="font-display text-washi/10 text-4xl font-bold tracking-tighter md:text-6xl">
                AGONY
              </span>
            </div>
          </div>

          {/* FRESH (wipes away) */}
          <motion.div
            style={{ width: maskWidth }}
            className="border-persimmon bg-washi absolute top-0 left-0 z-10 h-full overflow-hidden border-r will-change-[width]"
          >
            <div className="absolute top-0 left-0 aspect-[16/9] w-[100vw] max-w-5xl md:aspect-[2.35/1]">
              <Image
                src={freshImageUrl}
                alt="Fresh foam"
                fill
                className="object-cover contrast-110 grayscale-[15%]"
              />
              <div className="bg-washi/10 absolute inset-0 mix-blend-overlay" />
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-sumi mb-2 block font-mono text-[10px] tracking-widest uppercase">
                  {freshLabel}
                </span>
                <span className="font-display text-washi/80 text-4xl font-bold tracking-tighter drop-shadow-md md:text-6xl">
                  SUPPORT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Meridian wiper */}
          <motion.div
            style={{ left: linePosition }}
            className="bg-persimmon absolute top-0 bottom-0 z-20 w-px shadow-[0_0_12px_var(--color-persimmon-25)]"
          />
        </div>

        <div className="absolute right-0 bottom-12 left-0 animate-pulse text-center">
          <p className="text-stone/40 font-mono text-[10px] tracking-widest uppercase">
            Scroll to Degrade
          </p>
        </div>
      </div>
    </div>
  )
}
