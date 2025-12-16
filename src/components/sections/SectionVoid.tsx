"use client";

import { KakemonoSection } from "@/components/layout/KakemonoSection";

export function SectionVoid() {
  return (
    <KakemonoSection id="void" bleed className="border-t-0">
      <div className="h-[100svh] w-full relative flex items-center justify-center">
        <div className="text-center px-6">
          <p className="k-kicker mb-6">hisoles</p>
          <p className="k-title k-title-xl">the art of standing</p>
          <p className="k-body mt-8 text-sm md:text-base max-w-md mx-auto">
            For those who cannot stop.
          </p>
        </div>
      </div>
    </KakemonoSection>
  );
}
