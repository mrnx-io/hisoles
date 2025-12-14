"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";

export function SectionArtifact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const { setTravelingDotSuppressed } = useSpine();
  const suppressedRef = useRef(false);

  // The guiding dot "merges" into the product: briefly suppress the TravelingDot during emergence.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const shouldSuppress = v >= 0.08 && v <= 0.26;
    if (shouldSuppress === suppressedRef.current) return;
    suppressedRef.current = shouldSuppress;
    setTravelingDotSuppressed(shouldSuppress);
  });

  useEffect(() => {
    return () => setTravelingDotSuppressed(false);
  }, [setTravelingDotSuppressed]);

  // Emergence: dot -> insole
  const emergeScale = useTransform(scrollYProgress, [0.05, 0.25], [0.03, 1]);
  const emergeOpacity = useTransform(scrollYProgress, [0.05, 0.16], [0, 1]);

  // "Unzip" along the Meridian: charcoal splits open from the center line.
  const unzip = useTransform(scrollYProgress, [0.38, 0.72], [0, 1]);
  const leftX = useTransform(unzip, [0, 1], [0, -90]);
  const rightX = useTransform(unzip, [0, 1], [0, 90]);
  const skinOpacity = useTransform(unzip, [0, 1], [1, 0]);
  const annotationOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);

  return (
    <section ref={ref} className="h-[200vh] relative z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* THE ARTIFACT — top-down insole, floating in the void */}
        <motion.div
          style={{ scale: emergeScale, opacity: emergeOpacity }}
          className="relative w-[260px] h-[560px] md:w-[320px] md:h-[680px]"
        >
          {/* INNER CORE (hidden until unzipped) */}
          <div className="absolute inset-0 bg-persimmon rounded-[100px] shadow-[0_25px_50px_var(--color-persimmon-25)] overflow-hidden">
            {/* Honeycomb */}
            <svg
              width="100%"
              height="100%"
              className="opacity-20 mix-blend-overlay absolute inset-0 text-washi"
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

            <div className="absolute left-1/2 -translate-x-1/2 top-10 font-mono text-washi/70 text-[10px] uppercase tracking-wide-cta">
              Honeycomb Core
            </div>
          </div>

          {/* OUTER SKIN (charcoal top-cloth) — splits along the Meridian */}
          <motion.div
            style={{ x: leftX, opacity: skinOpacity }}
            className="absolute inset-0 rounded-[100px] overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-charcoal"
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
            className="absolute inset-0 rounded-[100px] overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-charcoal"
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

          {/* Seam — aligned to the Meridian */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-washi/10"
            aria-hidden="true"
          />
        </motion.div>

        {/* Minimal spec callouts (Space Mono) */}
        <motion.div
          style={{ opacity: annotationOpacity }}
          className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 max-w-[220px]"
        >
          <p className="font-mono text-[10px] text-stone uppercase tracking-wide-cta">
            Charcoal top-cloth
          </p>
          <p className="font-body font-light text-2xl md:text-3xl text-sumi leading-[0.95] mt-3">
            Hidden support.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: annotationOpacity }}
          className="absolute right-6 md:right-20 bottom-28 text-right"
        >
          <p className="font-mono text-[10px] text-stone uppercase tracking-wide-cta">
            Rebound: <span className="text-sumi">98%</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
