"use client"

import { KakemonoSection } from "@/components/layout/KakemonoSection"

export function SectionVoid() {
  return (
    <KakemonoSection id="void" bleed className="border-t-0">
      <div className="relative flex h-[100svh] w-full items-center justify-center">
        <div className="px-6 text-center">
          <p className="k-kicker mb-6">hisoles</p>
          <p className="k-title k-title-xl">the art of standing</p>
          <p className="k-body mx-auto mt-8 max-w-md text-sm md:text-base">
            For those who cannot stop.
          </p>
        </div>
      </div>
    </KakemonoSection>
  )
}
