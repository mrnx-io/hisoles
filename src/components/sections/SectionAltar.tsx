"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/components/layout/CartProvider";
import { KakemonoSection } from "@/components/layout/KakemonoSection";

const PRICING = {
  onePair: { id: "trial", label: "1 Pair", price: 39, note: "Trial" },
  twoPairs: { id: "rotation", label: "2 Pairs", price: 69, note: "Rotation" },
} as const;

export function SectionAltar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const [selection, setSelection] = useState<keyof typeof PRICING>("twoPairs");
  const { addItem } = useCart();

  const handleCheckout = () => {
    const selected = PRICING[selection];
    addItem({ id: selected.id, name: selected.label, price: selected.price });
  };

  const blockScaleX = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const whisperOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);

  return (
    <KakemonoSection id="altar" bleed>
      <motion.div
        ref={ref}
        className="relative min-h-[100svh] py-40 px-6 flex flex-col items-center justify-center"
      >
        {/* Meridian widens into altar - subtle Ma presence */}
        <div className="absolute inset-0 flex justify-center pointer-events-none" aria-hidden="true">
          <motion.div
            style={{ scaleX: blockScaleX, transformOrigin: "center" }}
            className="w-full max-w-lg h-full bg-stone/[0.03] border-x border-stone/[0.06]"
          />
        </div>

        <div className="max-w-md w-full relative z-20">
          {/* Header with Ma spacing */}
          <div className="text-center mb-20">
            <span className="k-kicker mb-6 block">The Altar</span>
            <h2 className="k-title k-title-xl">Start the shift.</h2>
            <p className="k-body mt-8 text-sm max-w-sm mx-auto">
              Quiet, structured relief — the kind you don&apos;t have to think about.
            </p>
          </div>

          {/* Pricing options - Kanso unified form, Wabi-sabi organic glow */}
          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            {/* 1 Pair */}
            <button
              type="button"
              onClick={() => setSelection("onePair")}
              className={`flex-1 py-8 px-6 border transition-all duration-500 ${
                selection === "onePair"
                  ? "border-sumi bg-transparent"
                  : "border-stone/15 bg-transparent hover:border-stone/30"
              }`}
              aria-pressed={selection === "onePair"}
            >
              <div className="flex flex-col items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    selection === "onePair" ? "bg-sumi" : "bg-stone/20"
                  }`}
                />
                <span className="font-body font-light text-xl leading-none">
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
              className={`flex-1 py-8 px-6 border transition-all duration-500 ${
                selection === "twoPairs"
                  ? "border-persimmon/60 bg-persimmon/5 shadow-[0_0_20px_var(--color-persimmon-25)]"
                  : "border-stone/15 bg-transparent hover:border-persimmon/30 hover:bg-persimmon/[0.02]"
              }`}
              aria-pressed={selection === "twoPairs"}
            >
              <div className="flex flex-col items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    selection === "twoPairs"
                      ? "bg-persimmon shadow-[0_0_8px_var(--color-persimmon-50)]"
                      : "bg-stone/20"
                  }`}
                />
                <span className="font-body font-light text-xl leading-none">
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
            className="group w-full h-14 bg-sumi text-washi flex items-center justify-center gap-3 font-body text-base uppercase tracking-widest transition-all duration-500 hover:bg-persimmon"
          >
            <span>Start the Shift</span>
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </button>

          {/* Whisper copy */}
          <motion.p style={{ opacity: whisperOpacity }} className="mt-8 text-center k-whisper">
            {selection === "onePair"
              ? ">> rotate for longevity. add 2nd pair for $29 in checkout."
              : ">> rotation extends the ritual."}
          </motion.p>

          {/* Trust signals - elevated with Ma separation */}
          <div className="mt-16 pt-8 border-t border-stone/10">
            <div className="flex justify-center gap-12 text-stone/50 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone/30 rounded-full" />
                90-day guarantee
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-stone/30 rounded-full" />
                Free returns
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </KakemonoSection>
  );
}
