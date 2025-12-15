"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { KakemonoSection } from "@/components/layout/KakemonoSection";

export function SectionVoid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Paper halves part (Ma: space between becomes visible)
  const split = useTransform(scrollYProgress, [0.05, 0.45], [0, 36]);
  const leftX = useTransform(split, (v) => -v);
  const rightX = useTransform(split, (v) => v);

  // Depth seam breathes in
  const seamOpacity = useTransform(scrollYProgress, [0.12, 0.55], [0, 1]);
  const seamWidth = useTransform(scrollYProgress, [0.12, 0.55], [2, 44]);

  // Copy is present at rest; the void opens on scroll.
  const textOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.12], [0, 0]);

  return (
    <KakemonoSection id="void" bleed className="border-t-0">
      <div ref={ref} className="h-[170svh] w-full relative">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Underworld depth (revealed by split) */}
          <div className="absolute inset-0 bg-sumi">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,93,4,0.10)_0%,transparent_40%,rgba(26,26,26,0.85)_100%)]" />
          </div>

          {/* Left paper */}
          <motion.div
            style={{ x: leftX }}
            className="absolute inset-y-0 left-0 w-1/2 bg-washi"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,26,26,0.08),transparent_35%)] opacity-25" />
          </motion.div>

          {/* Right paper */}
          <motion.div
            style={{ x: rightX }}
            className="absolute inset-y-0 right-0 w-1/2 bg-washi"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(26,26,26,0.08),transparent_35%)] opacity-25" />
          </motion.div>

          {/* The seam (space between) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <motion.div
              style={{ opacity: seamOpacity, width: seamWidth }}
              className="h-[86vh] bg-[linear-gradient(to_bottom,transparent,rgba(232,93,4,0.12),transparent)] shadow-[0_0_28px_rgba(232,93,4,0.15)]"
            />
          </div>

          {/* Copy (centered on spine) */}
          <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="k-kicker mb-6">hisoles</p>
              <p className="k-title k-title-xl">the art of standing</p>
              <p className="k-body mt-8 text-sm md:text-base max-w-md mx-auto">
                For those who cannot stop.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </KakemonoSection>
  );
}
