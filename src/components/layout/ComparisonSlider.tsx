"use client";

import { useState } from "react";
import Image from "next/image";

interface ComparisonSliderProps {
  leftImageUrl: string;  // Week 1 (fresh)
  rightImageUrl: string; // Week 12 (dead)
  leftLabel?: string;
  rightLabel?: string;
  ariaLabel?: string;
}

export function ComparisonSlider({
  leftImageUrl,
  rightImageUrl,
  leftLabel = "Week 1",
  rightLabel = "Week 12",
  ariaLabel = "Comparison slider",
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative z-20 w-full max-w-5xl aspect-[16/9] md:aspect-[2.35/1] bg-stone/20 rounded-sm overflow-hidden shadow-xl cursor-ew-resize select-none group border border-stone/10">
      {/* RIGHT: Dead (Week 12) */}
      <div className="absolute inset-0 bg-stone">
        <Image
          src={rightImageUrl}
          alt="Dead foam (Week 12)"
          fill
          className="object-cover grayscale brightness-[0.45] blur-[2px] scale-105 saturate-0"
        />
        <div className="absolute inset-0 bg-sumi/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,var(--color-sumi-40)_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sumi/10 font-body font-bold text-[10vw] leading-none tracking-tighter">
          PAIN
        </div>
      </div>

      {/* LEFT: Fresh (Week 1) */}
      <div
        className="absolute inset-0 bg-washi border-r border-persimmon overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={leftImageUrl}
          alt="Fresh foam (Week 1)"
          fill
          className="object-cover grayscale-[65%] contrast-150 brightness-110"
        />
        <div className="absolute inset-0 bg-washi/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] max-w-5xl text-center pointer-events-none">
          <div className="text-white/20 font-body font-bold text-[10vw] leading-none tracking-tighter">
            HELD
          </div>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
        aria-label={ariaLabel}
      />

      {/* Meridian Handle */}
      <div className="absolute top-0 bottom-0 z-20 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-0 bottom-0 w-px bg-persimmon opacity-90 shadow-[0_0_12px_var(--color-persimmon-50)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0">
          <div className="w-[6px] h-[6px] bg-persimmon rounded-full shadow-[0_0_18px_var(--color-persimmon-60)]" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-washi bg-persimmon px-2 py-1 tracking-wide-cta uppercase">
        {leftLabel}
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-washi bg-stone px-2 py-1 tracking-wide-cta uppercase">
        {rightLabel}
      </div>
    </div>
  );
}
