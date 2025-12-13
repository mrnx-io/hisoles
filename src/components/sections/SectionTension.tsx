"use client";

import { ComparisonSlider } from "@/components/ui/ComparisonSlider";

const COMPARISON_IMAGE =
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2400&auto=format&fit=crop";

export function SectionTension() {
  return (
    <section className="min-h-[120vh] w-full pt-16 pb-32 px-4 flex flex-col items-center justify-center relative">
      <div className="max-w-4xl w-full text-center mb-16">
        <h2 className="font-body font-light text-4xl md:text-6xl text-sumi mb-6 leading-[0.95]">
          Gravity is
          <br />
          the enemy.
        </h2>
        <p className="font-body text-stone max-w-lg mx-auto leading-relaxed text-lg">
          Your shoes aren&apos;t dead. The foam is. <br />
          <span className="text-sm opacity-70">
            By Hour 10, standard EVA foam has surrendered to the floor.
          </span>
        </p>
      </div>

      {/* DEAD SHOE SLIDER */}
      <ComparisonSlider imageUrl={COMPARISON_IMAGE} />
    </section>
  );
}
