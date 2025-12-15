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
        className="relative min-h-[100svh] pt-36 pb-24 px-6 flex flex-col items-center justify-center bg-washi"
      >
        {/* Meridian widens into altar */}
        <div className="absolute inset-0 flex justify-center pointer-events-none" aria-hidden="true">
          <motion.div
            style={{ scaleX: blockScaleX, transformOrigin: "center" }}
            className="w-full max-w-xl h-full bg-stone/5 border-x border-stone/10"
          />
        </div>

        <div className="max-w-xl w-full relative z-20">
          <div className="text-center mb-16">
            <span className="k-kicker mb-4 block">The Altar</span>
            <h2 className="k-title k-title-xl">Start the shift.</h2>
            <p className="k-body mt-6 text-sm max-w-md mx-auto">
              Quiet, structured relief — the kind you don&apos;t have to think about.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* 1 Pair */}
            <button
              type="button"
              onClick={() => setSelection("onePair")}
              className={`h-20 border px-5 flex flex-col items-center justify-center transition-colors ${
                selection === "onePair"
                  ? "border-sumi text-sumi"
                  : "border-stone/20 text-stone hover:border-stone/40"
              }`}
              aria-pressed={selection === "onePair"}
            >
              <span className="font-body font-light text-lg leading-none">{PRICING.onePair.label}</span>
              <span className="k-whisper mt-2">${PRICING.onePair.price} · {PRICING.onePair.note}</span>
            </button>

            {/* 2 Pairs (brushstroke highlight) */}
            <button
              type="button"
              onClick={() => setSelection("twoPairs")}
              className={`relative h-20 px-5 flex flex-col items-center justify-center transition-opacity ${
                selection === "twoPairs" ? "opacity-100" : "opacity-85 hover:opacity-100"
              } bg-persimmon text-washi overflow-hidden`}
              aria-pressed={selection === "twoPairs"}
            >
              <span
                className="absolute inset-0 opacity-25 mix-blend-multiply"
                style={{
                  backgroundImage: "url(/brushstroke.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "120% 120%",
                }}
                aria-hidden="true"
              />
              <span className="relative font-body font-light text-lg leading-none">{PRICING.twoPairs.label}</span>
              <span className="relative k-whisper mt-2 text-washi/85">
                ${PRICING.twoPairs.price} · {PRICING.twoPairs.note}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full h-16 bg-persimmon text-washi flex items-center justify-center gap-4 font-body text-lg uppercase tracking-widest hover:brightness-95 transition-[filter] duration-300 group"
          >
            Start the Shift
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          <motion.p style={{ opacity: whisperOpacity }} className="mt-6 text-center k-whisper">
            {selection === "onePair"
              ? ">> rotate for longevity. add 2nd pair for $29 in checkout."
              : ">> rotation extends the ritual."}
          </motion.p>

          <div className="mt-10 flex justify-between items-center text-stone/60 font-mono text-[10px] uppercase tracking-widest">
            <span>90-day guarantee</span>
            <span>Free returns</span>
          </div>
        </div>
      </motion.div>
    </KakemonoSection>
  );
}
