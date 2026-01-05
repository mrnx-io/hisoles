"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function OfferStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px (past hero section)
      const scrollThreshold = 500
      setIsVisible(window.scrollY > scrollThreshold)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "border-stone/10 bg-washi/95 fixed inset-x-0 bottom-0 z-[65] border-t backdrop-blur transition-all duration-300 md:hidden",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="bg-sumi text-washi font-body hover:bg-persimmon active:bg-persimmon inline-flex h-12 flex-1 items-center justify-center px-3 text-xs tracking-widest whitespace-nowrap uppercase transition-colors"
          >
            Get 2 Pairs — $69
          </a>
          <a
            data-checkout-link
            href="/checkout?add=trial"
            className="border-stone/20 text-sumi font-body hover:border-persimmon active:border-persimmon inline-flex h-12 flex-1 items-center justify-center border bg-transparent px-3 text-xs tracking-widest whitespace-nowrap uppercase transition-colors"
          >
            Try 1 Pair — $39
          </a>
        </div>
        <p className="text-stone/60 mt-2 text-center font-mono text-[11px] tracking-wider uppercase">
          Most choose 2 pairs · Ships fast · 90-day guarantee
        </p>
      </div>
    </div>
  )
}
