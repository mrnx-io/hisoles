"use client"

import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef, useState } from "react"
import { KakemonoSection } from "@/components/layout/KakemonoSection"
import { useCartStore } from "@/stores/cart-store"

const PRICING = {
  onePair: { id: "trial", label: "1 Pair", price: 39, note: "Trial" },
  twoPairs: { id: "rotation", label: "2 Pairs", price: 69, note: "Rotation" },
} as const

export function SectionAltar() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  })

  const [selection, setSelection] = useState<keyof typeof PRICING>("twoPairs")
  const addItem = useCartStore((s) => s.addItem)

  const handleCheckout = () => {
    const selected = PRICING[selection]
    addItem({ id: selected.id, name: selected.label, price: selected.price })
  }

  const blockScaleX = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const whisperOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1])

  return (
    <KakemonoSection id="altar" bleed>
      <motion.div
        ref={ref}
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-40"
      >
        {/* Meridian widens into altar - subtle Ma presence */}
        <div
          className="pointer-events-none absolute inset-0 flex justify-center"
          aria-hidden="true"
        >
          <motion.div
            style={{ scaleX: blockScaleX, transformOrigin: "center" }}
            className="bg-stone/[0.03] border-stone/[0.06] h-full w-full max-w-lg border-x"
          />
        </div>

        <div className="relative z-20 w-full max-w-md">
          {/* Header with Ma spacing */}
          <div className="mb-20 text-center">
            <span className="k-kicker mb-6 block">The Altar</span>
            <h2 className="k-title k-title-xl">Start the shift.</h2>
            <p className="k-body mx-auto mt-8 max-w-sm text-sm">
              Quiet, structured relief — the kind you don&apos;t have to think about.
            </p>
          </div>

          {/* Pricing options - Kanso unified form, Wabi-sabi organic glow */}
          <div className="mb-12 flex flex-col gap-6 sm:flex-row">
            {/* 1 Pair */}
            <button
              type="button"
              onClick={() => setSelection("onePair")}
              className={`flex-1 border px-6 py-8 transition-all duration-500 ${
                selection === "onePair"
                  ? "border-sumi bg-transparent"
                  : "border-stone/15 hover:border-stone/30 bg-transparent"
              }`}
              aria-pressed={selection === "onePair"}
            >
              <div className="flex flex-col items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    selection === "onePair" ? "bg-sumi" : "bg-stone/20"
                  }`}
                />
                <span className="font-body text-xl leading-none font-light">
                  {PRICING.onePair.label}
                </span>
                <span className="k-whisper">
                  ${PRICING.onePair.price} · {PRICING.onePair.note}
                </span>
              </div>
            </button>

            {/* 2 Pairs - organic persimmon glow emphasis */}
            <button
              type="button"
              onClick={() => setSelection("twoPairs")}
              className={`flex-1 border px-6 py-8 transition-all duration-500 ${
                selection === "twoPairs"
                  ? "border-persimmon/60 bg-persimmon/5 shadow-[0_0_20px_var(--color-persimmon-25)]"
                  : "border-stone/15 hover:border-persimmon/30 hover:bg-persimmon/[0.02] bg-transparent"
              }`}
              aria-pressed={selection === "twoPairs"}
            >
              <div className="flex flex-col items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    selection === "twoPairs"
                      ? "bg-persimmon shadow-[0_0_8px_var(--color-persimmon-50)]"
                      : "bg-stone/20"
                  }`}
                />
                <span className="font-body text-xl leading-none font-light">
                  {PRICING.twoPairs.label}
                </span>
                <span className="k-whisper">
                  ${PRICING.twoPairs.price} · {PRICING.twoPairs.note}
                </span>
                <span className="k-whisper text-persimmon/70 mt-1">recommended</span>
              </div>
            </button>
          </div>

          {/* CTA - minimal motion, sumi to persimmon transition */}
          <button
            type="button"
            onClick={handleCheckout}
            className="group bg-sumi text-washi font-body hover:bg-persimmon flex h-14 w-full items-center justify-center gap-3 text-base tracking-widest uppercase transition-all duration-500"
          >
            <span>Start the Shift</span>
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </button>

          {/* Whisper copy */}
          <motion.p style={{ opacity: whisperOpacity }} className="k-whisper mt-8 text-center">
            {selection === "onePair"
              ? ">> rotate for longevity. add 2nd pair for $29 in checkout."
              : ">> rotation extends the ritual."}
          </motion.p>

          {/* Trust signals - elevated with Ma separation */}
          <div className="border-stone/10 mt-16 border-t pt-8">
            <div className="text-stone/50 flex justify-center gap-12 font-mono text-[10px] tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <span className="bg-stone/30 h-1.5 w-1.5 rounded-full" />
                90-day guarantee
              </span>
              <span className="flex items-center gap-2">
                <span className="bg-stone/30 h-1.5 w-1.5 rounded-full" />
                Free returns
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </KakemonoSection>
  )
}
