"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/components/layout/CartProvider";

const PRICING = {
  onePair: { id: "trial", label: "1 Pair", price: 39 },
  twoPairs: { id: "rotation", label: "2 Pairs", price: 69 },
} as const;

export function SectionAltar() {
  const ref = useRef<HTMLElement>(null);
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

  // Meridian widens into a centered block behind the offer.
  const blockScaleX = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.section
      ref={ref}
      id="altar"
      className="relative min-h-screen pt-40 pb-32 px-6 flex flex-col items-center justify-center bg-washi"
    >
      {/* Meridian widening into an altar block */}
      <div className="absolute inset-0 flex justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ scaleX: blockScaleX, transformOrigin: "center" }}
          className="w-full max-w-xl h-full bg-stone/5 border-x border-stone/10"
        />
      </div>

      <div className="max-w-xl w-full relative z-20">
        <div className="text-center mb-20">
          <span className="font-mono text-xs text-stone uppercase tracking-wide-cta mb-4 block">
            The Altar
          </span>
          <h2 className="font-body font-light text-5xl md:text-6xl text-sumi leading-[0.95]">
            Start the Shift.
          </h2>
        </div>

        {/* The Buttons (per spec) */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button
            type="button"
            onClick={() => setSelection("onePair")}
            className={`h-16 border px-6 flex items-center justify-center transition-colors ${
              selection === "onePair"
                ? "border-sumi text-sumi"
                : "border-stone/20 text-stone hover:border-stone/40"
            }`}
            aria-pressed={selection === "onePair"}
          >
            <span className="font-body font-light text-lg">{PRICING.onePair.label}</span>
          </button>
          <button
            type="button"
            onClick={() => setSelection("twoPairs")}
            className={`h-16 px-6 flex items-center justify-center transition-opacity ${
              selection === "twoPairs" ? "opacity-100" : "opacity-80 hover:opacity-100"
            } bg-persimmon text-washi`}
            aria-pressed={selection === "twoPairs"}
          >
            <span className="font-body font-light text-lg">{PRICING.twoPairs.label}</span>
          </button>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full h-16 bg-persimmon text-washi flex items-center justify-center gap-4 font-body text-lg uppercase tracking-widest hover:brightness-95 transition-[filter] duration-300 group"
        >
          Start the Shift
          <ArrowRight
            size={22}
            className="group-hover:translate-x-2 transition-transform duration-300"
          />
        </button>

        {/* The Bump (per spec) */}
        <p className="text-center mt-5 font-mono text-[10px] text-stone/70 uppercase tracking-wide-cta">
          &gt;&gt; rotate for longevity. add 2nd pair for $29.
        </p>
      </div>
    </motion.section>
  );
}
