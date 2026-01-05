"use client"

import { ShieldCheck, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const STAR_POSITIONS = [0, 1, 2, 3, 4] as const

export function OfferStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 350px (earlier for mobile thumb scrolling)
      const scrollThreshold = 350
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
        <div className="flex items-center gap-3">
          <a
            data-checkout-link
            href="/checkout?add=trial"
            className="bg-sumi text-washi font-body hover:bg-persimmon active:bg-persimmon inline-flex h-12 flex-1 items-center justify-center px-3 text-xs tracking-widest whitespace-nowrap uppercase transition-colors"
          >
            Test for $39
          </a>
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="border-stone/20 text-sumi font-body hover:border-persimmon active:border-persimmon inline-flex h-12 flex-1 items-center justify-center border bg-transparent px-3 text-xs tracking-widest whitespace-nowrap uppercase transition-colors"
          >
            3 Pairs — $69
          </a>
        </div>
        {/* Trust signals row with star rating */}
        <div className="mt-2 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5" role="img" aria-label="4.8 out of 5 stars">
              {STAR_POSITIONS.map((pos) => (
                <Star
                  key={`sticky-star-${pos}`}
                  className="fill-persimmon text-persimmon h-3 w-3"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sumi font-mono text-[10px] font-medium">4.8</span>
          </div>
          <span className="text-stone/30">·</span>
          <span className="text-stone/60 flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase">
            <ShieldCheck className="text-stone/50 h-3 w-3" />
            90-day guarantee
          </span>
        </div>
      </div>
    </div>
  )
}
