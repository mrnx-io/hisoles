"use client"

import { KakemonoSection } from "@/components/layout/KakemonoSection"
import { ScrollComparison } from "@/components/layout/ScrollComparison"

export function SectionDecay() {
  return (
    <KakemonoSection id="decay" bleed className="min-h-auto">
      <div className="flex w-full flex-col items-center">
        <div className="px-6 py-20 text-center">
          <p className="k-kicker mb-4">Dead Shoe Syndrome</p>
          <h2 className="k-title k-title-xl">Your shoes aren&apos;t dead. The foam is.</h2>
          <p className="k-body mx-auto mt-6 max-w-md text-lg">
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
  )
}
