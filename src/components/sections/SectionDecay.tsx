"use client";

import { ComparisonSlider } from "@/components/layout/ComparisonSlider";

export function SectionDecay() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 bg-washi">
      <div className="mb-10 text-center">
        <p className="font-mono text-[10px] text-stone uppercase tracking-wide-cta mb-4">
          Material Truth
        </p>
        <h2 className="font-body font-light text-3xl md:text-4xl text-sumi leading-[0.95]">
          Foam dies. Support fades.
        </h2>
      </div>
      <ComparisonSlider imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop" />
    </section>
  );
}
