"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { KakemonoSection } from "@/components/layout/KakemonoSection";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export function SectionTension() {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  const velocityBlur = useTransform(smoothVelocity, [0, 2000], [0, 6]);
  const velocitySkew = useTransform(smoothVelocity, [-1500, 1500], [-3, 3]);

  // Also add a slow “gravity” base blur tied to section progress
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const baseBlur = useTransform(scrollYProgress, [0.25, 0.75], [0, 2.5]);
  const blur = useTransform([baseBlur, velocityBlur], ([b, v]: number[]) => (reducedMotion ? 0 : b + v));

  const baseSkew = useTransform(scrollYProgress, [0.2, 0.8], [0, 1.5]);
  const skew = useTransform([baseSkew, velocitySkew], ([b, v]: number[]) => (reducedMotion ? 0 : b + v));

  // Tremor threshold (only when “chaos” rises)
  const chaos = useTransform(scrollYProgress, [0.35, 0.85], [0, 1]);
  const [tremorOn, setTremorOn] = useState(false);

  useMotionValueEvent(chaos, "change", (v) => {
    setTremorOn(!reducedMotion && v > 0.65);
  });

  const rulerStyle = useMemo(
    () => ({
      backgroundImage:
        "repeating-linear-gradient(to bottom, rgba(74,74,74,0.25) 0px, rgba(74,74,74,0.25) 1px, transparent 1px, transparent 18px)",
    }),
    []
  );

  return (
    <KakemonoSection id="tension" bleed>
      <div ref={ref} className="min-h-[150svh] w-full relative">
        <div className="sticky top-0 h-[100svh] w-full flex flex-col md:flex-row">
          {/* Central shift ruler (anchored to meridian) */}
          <div className="absolute inset-0 pointer-events-none flex justify-center" aria-hidden="true">
            <div className="relative w-[120px] h-full opacity-30">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-stone/30" />
              <div className="absolute inset-y-10 bottom-10 left-1/2 -translate-x-1/2 w-px" style={rulerStyle} />
              <div className="absolute top-12 left-1/2 -translate-x-1/2 -ml-10 font-mono text-[10px] uppercase tracking-widest text-stone/60">
                08:00
              </div>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 -ml-10 font-mono text-[10px] uppercase tracking-widest text-stone/60">
                20:00
              </div>
            </div>
          </div>

          {/* LEFT: Calm (Hour 1) */}
          <div className="w-full md:w-1/2 min-h-[60svh] md:min-h-[100svh] border-r border-stone/10 flex items-center justify-end pr-6 md:pr-16 z-10">
            <div className="text-right py-20">
              <span className="w-2 h-2 bg-sumi rounded-full mb-4 inline-block" />
              <p className="k-kicker">08:00 — Hour 1</p>
              <h2 className="k-title k-title-xl mt-4">Grounded.</h2>
              <p className="k-body mt-4 max-w-[220px] ml-auto">
                Structure holds. Mind is clear.
              </p>
            </div>
          </div>

          {/* RIGHT: Chaos (Hour 10) */}
          <div className="w-full md:w-1/2 min-h-[60svh] md:min-h-[100svh] bg-stone/5 flex items-center justify-start pl-6 md:pl-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-18 mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <motion.div
              className={cn("text-left relative z-10 py-20", tremorOn && "chaos-tremor")}
              style={{
                filter: useTransform(blur, (v) => `blur(${v}px)`),
                skewX: useTransform(skew, (v) => `${v}deg`),
              }}
            >
              <span className="w-2 h-2 bg-persimmon rounded-full mb-4 inline-block shadow-[0_0_8px_var(--color-persimmon-25)]" />
              <p className="k-kicker text-persimmon">18:00 — Hour 10</p>

              <div className="relative mt-4">
                <h2 className="absolute top-0 left-0 k-title k-title-xl text-stone/20 blur-[2px]">
                  Shattered.
                </h2>
                <h2 className="k-title k-title-xl text-stone/80 relative">Shattered.</h2>
              </div>

              <p className="k-body mt-4 max-w-[240px] text-stone/60">
                You&apos;re still standing.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </KakemonoSection>
  );
}
