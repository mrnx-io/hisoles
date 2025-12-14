"use client";

import { useState } from "react";
import Image from "next/image";

interface ComparisonSliderProps {
  imageUrl: string;
}

export function ComparisonSlider({ imageUrl }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative z-20 w-full max-w-5xl aspect-[16/9] md:aspect-[2.35/1] bg-stone/20 rounded-sm overflow-hidden shadow-xl cursor-ew-resize select-none group border border-stone/10">
      {/* RIGHT LAYER: DEAD (Hour 10) — oppressive, heavy, defeated */}
      <div className="absolute inset-0 bg-stone">
        <Image
          src={imageUrl}
          alt="Dead Foam - Week 12"
          fill
          className="object-cover grayscale brightness-[0.4] blur-[3px] scale-105 saturate-0"
          priority
        />
        {/* Oppressive overlay */}
        <div className="absolute inset-0 bg-sumi/30 mix-blend-multiply" />
        {/* Vignette for weight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,var(--color-sumi-40)_100%)]" />
        {/* Text Effect — more visible */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sumi/10 font-body font-bold text-[10vw] leading-none tracking-tighter">
          PAIN
        </div>
      </div>

      {/* LEFT LAYER: FRESH (Hour 1) — crisp, light, vital */}
      <div
        className="absolute inset-0 bg-washi border-r border-persimmon overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={imageUrl}
          alt="Fresh Foam - Week 1"
          fill
          className="object-cover grayscale-[70%] contrast-150 brightness-110"
          priority
        />
        {/* Subtle lift overlay */}
        <div className="absolute inset-0 bg-washi/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] max-w-5xl text-center pointer-events-none">
          <div className="text-white/20 font-body font-bold text-[10vw] leading-none tracking-tighter">
            HELD
          </div>
        </div>
      </div>

      {/* SLIDER CONTROLS */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
        aria-label="Comparison slider"
      />

      {/* THE HANDLE — increased visual weight */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-persimmon z-20 pointer-events-none shadow-[0_0_10px_var(--color-persimmon-50)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-persimmon rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-persimmon-60)] transform transition-transform group-active:scale-90 group-hover:scale-105">
          <div className="flex gap-[3px]">
            <div className="w-[2px] h-4 bg-washi/90 rounded-full" />
            <div className="w-[2px] h-4 bg-washi/90 rounded-full" />
          </div>
        </div>
      </div>

      {/* DATA LABELS */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-washi bg-persimmon px-2 py-1 tracking-widest uppercase">
        Week 1
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-washi bg-stone px-2 py-1 tracking-widest uppercase">
        Week 12
      </div>
    </div>
  );
}
