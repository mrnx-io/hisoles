"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollComparisonProps {
  freshImageUrl: string;
  deadImageUrl: string;
  freshLabel?: string;
  deadLabel?: string;
}

export function ScrollComparison({
  freshImageUrl,
  deadImageUrl,
  freshLabel = "Hour 1",
  deadLabel = "Hour 12",
}: ScrollComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maskWidth = useTransform(scrollYProgress, [0.1, 0.9], ["100%", "0%"]);
  const linePosition = useTransform(scrollYProgress, [0.1, 0.9], ["100%", "0%"]);

  return (
    <div ref={containerRef} className="relative h-[250svh] w-full">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center bg-stone/5">
        <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[2.35/1] shadow-2xl bg-sumi mx-6 border border-stone/10">
          {/* DEAD (under) */}
          <div className="absolute inset-0">
            <Image
              src={deadImageUrl}
              alt="Dead foam"
              fill
              className="object-cover grayscale brightness-[0.4] blur-[2px]"
            />
            <div className="absolute inset-0 bg-sumi/40 mix-blend-multiply" />
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="font-mono text-[10px] text-persimmon uppercase tracking-widest mb-2 block">
                {deadLabel}
              </span>
              <span className="font-display font-bold text-4xl md:text-6xl text-washi/10 tracking-tighter">
                AGONY
              </span>
            </div>
          </div>

          {/* FRESH (wipes away) */}
          <motion.div
            style={{ width: maskWidth }}
            className="absolute top-0 left-0 h-full border-r border-persimmon bg-washi overflow-hidden z-10 will-change-[width]"
          >
            <div className="absolute top-0 left-0 w-[100vw] max-w-5xl aspect-[16/9] md:aspect-[2.35/1]">
              <Image
                src={freshImageUrl}
                alt="Fresh foam"
                fill
                className="object-cover grayscale-[15%] contrast-110"
              />
              <div className="absolute inset-0 bg-washi/10 mix-blend-overlay" />
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="font-mono text-[10px] text-sumi uppercase tracking-widest mb-2 block">
                  {freshLabel}
                </span>
                <span className="font-display font-bold text-4xl md:text-6xl text-washi/80 tracking-tighter drop-shadow-md">
                  SUPPORT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Meridian wiper */}
          <motion.div
            style={{ left: linePosition }}
            className="absolute top-0 bottom-0 w-px bg-persimmon z-20 shadow-[0_0_12px_var(--color-persimmon-25)]"
          />
        </div>

        <div className="absolute bottom-12 left-0 right-0 text-center animate-pulse">
          <p className="font-mono text-[10px] text-stone/40 uppercase tracking-widest">
            Scroll to Degrade
          </p>
        </div>
      </div>
    </div>
  );
}
