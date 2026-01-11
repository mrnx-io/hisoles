"use client"

import { useInView } from "motion/react"
import { type ReactNode, useEffect, useRef } from "react"
import { type ChapterId, useSpine } from "@/components/layout/SpineProvider"
import { cn } from "@/lib/utils"

interface KakemonoSectionProps {
  id: ChapterId
  children: ReactNode
  className?: string
  /** When true, content spans full viewport width (no max-width or padding) */
  bleed?: boolean
}

export function KakemonoSection({ id, children, className, bleed = false }: KakemonoSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { setActiveChapter } = useSpine()

  // Lower threshold (0.25) ensures shorter sections like SectionDecay still trigger
  const isInView = useInView(ref, { amount: 0.25 })

  useEffect(() => {
    if (isInView) setActiveChapter(id)
  }, [isInView, id, setActiveChapter])

  return (
    <section
      ref={ref}
      id={id}
      data-chapter={id}
      className={cn(
        "relative flex w-full flex-col items-center",
        "min-h-[100svh]",
        "scroll-mt-28 md:scroll-mt-32",
        !bleed && "px-6 md:px-12",
        "border-stone/5 border-t",
        className
      )}
    >
      {/* Meridian guide anchor (global MeridianSystem draws the real spine) */}
      <div className="absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2" />

      <div className={cn("relative z-10 w-full", !bleed && "max-w-7xl")}>{children}</div>
    </section>
  )
}
