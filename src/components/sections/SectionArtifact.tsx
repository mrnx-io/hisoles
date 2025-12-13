"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function SectionArtifact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // "Unzip" the charcoal layer to reveal the Persimmon core
  const clipPath = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ["inset(0% 0 0 0)", "inset(100% 0 0 0)"]
  );
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1.05]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  return (
    <section ref={ref} className="h-[200vh] relative z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* PRODUCT CONTAINER */}
        <motion.div
          style={{ scale }}
          className="relative w-[280px] h-[580px] md:w-[340px] md:h-[700px]"
        >
          {/* 1. INNER CORE (PERSIMMON) */}
          <div className="absolute inset-0 bg-persimmon rounded-[100px] shadow-[0_25px_50px_rgba(var(--color-persimmon-rgb),0.3)] overflow-hidden flex items-center justify-center">
            {/* Honeycomb Pattern */}
            <svg
              width="100%"
              height="100%"
              className="opacity-20 mix-blend-overlay absolute inset-0 text-washi"
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

            <div className="absolute font-mono text-washi/50 text-xs tracking-rotated -rotate-90 whitespace-nowrap z-10">
              ENGINEERED REBOUND
            </div>
          </div>

          {/* 2. OUTER SKIN (CHARCOAL) - Reveals via ClipPath */}
          <motion.div
            style={{ clipPath }}
            className="absolute inset-0 bg-charcoal rounded-[100px] flex items-center justify-center shadow-2xl z-20"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
              }}
            />
            <div className="text-stone font-mono text-xs tracking-rotated -rotate-90 whitespace-nowrap">
              BREATHABLE CHARCOAL
            </div>
          </motion.div>
        </motion.div>

        {/* ANNOTATIONS */}
        <motion.div
          style={{ opacity }}
          className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 max-w-[180px]"
        >
          <h3 className="font-body font-medium text-2xl text-sumi mb-2">
            Hidden Support
          </h3>
          <div className="h-[1px] w-8 bg-persimmon mb-3" />
          <p className="font-body text-xs text-stone leading-relaxed">
            Structured arch support meets high-rebound cushioning.
            <span className="block mt-2 font-mono text-[10px] text-persimmon uppercase">
              Keep Scrolling to Unzip
            </span>
          </p>
        </motion.div>

        {/* SQUEEZE INDICATOR */}
        <motion.div
          style={{ opacity }}
          className="absolute right-4 md:right-24 bottom-32 text-right"
        >
          <span className="font-body font-bold text-5xl text-persimmon block">
            98%
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
            Energy Return
          </span>
        </motion.div>
      </div>
    </section>
  );
}
