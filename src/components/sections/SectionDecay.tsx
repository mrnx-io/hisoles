"use client";

import { ScrollComparison } from "@/components/layout/ScrollComparison";
import { KakemonoSection } from "@/components/layout/KakemonoSection";

export function SectionDecay() {
  return (
    <KakemonoSection id="decay" bleed className="min-h-auto">
      <div className="w-full flex flex-col items-center">
        <div className="py-20 text-center px-6">
          <p className="k-kicker mb-4">Dead Shoe Syndrome</p>
          <h2 className="k-title k-title-xl">Your shoes aren&apos;t dead. The foam is.</h2>
          <p className="k-body mt-6 text-lg max-w-md mx-auto">
            Support fades. Architecture endures.
          </p>
        </div>

        <ScrollComparison
          freshImageUrl="/images/deadshoe-week1.jpg"
          deadImageUrl="/images/deadshoe-week12.jpg"
          freshLabel="Week 1"
          deadLabel="Week 12"
        />
      </div>
    </KakemonoSection>
  );
}
