"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";
import { CHAPTERS } from "@/components/layout/chapters";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DETACH_SCROLL_PX = 120;

// Unified timing constants (match CSS tokens)
const DURATION_ATTENTION = 0.6;
const DELAY_MA = 0.08;
const EASE_EMERGE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Marker = { id: string; p: number };

export function MeridianSystem() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const { logoDotTopY, travelingDotSuppressed, positionReady } = useSpine();

  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;
      const max = Math.max(0, document.documentElement.scrollHeight - vh);
      setViewportHeight(vh);
      setScrollMax(max);

      if (max <= 0) return;

      // Equal spacing: distribute dots evenly along the line
      const n = CHAPTERS.length;
      const nextMarkers: Marker[] = CHAPTERS.map((c, index) => ({
        id: c.id,
        p: n > 1 ? index / (n - 1) : 0,
      }));

      setMarkers(nextMarkers);
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(document.documentElement);

    window.addEventListener("resize", compute);
    window.addEventListener("load", compute);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("load", compute);
    };
  }, []);

  const travelEndPx = Math.max(scrollMax, DETACH_SCROLL_PX + 1);
  const endY = viewportHeight ? viewportHeight * 0.94 : logoDotTopY;

  const dotTop = useTransform(
    scrollY,
    [0, DETACH_SCROLL_PX, travelEndPx],
    [logoDotTopY, logoDotTopY, endY]
  );

  const progress = useTransform(scrollY, [DETACH_SCROLL_PX, travelEndPx], [0, 1]);
  // Matched spring for progress line - fluid tracking
  const smoothProgress = useSpring(progress, {
    damping: 50,
    stiffness: 400,
    mass: 0.05,
    restSpeed: 0.001,
    restDelta: 0.0001,
  });
  const renderedProgress = reducedMotion ? progress : smoothProgress;

  // Line starts below the "ı" letter (dot + gap + letter height)
  const lineStartOffset = 26;
  const lineStyle = useMemo(
    () => ({
      marginTop: logoDotTopY + lineStartOffset,
      height: `calc(100% - ${logoDotTopY + lineStartOffset}px)`,
    }),
    [logoDotTopY]
  );

  return (
    <>
      {/* MERIDIAN LINE (structure) */}
      <div className="fixed inset-0 pointer-events-none z-[15] flex justify-center" aria-hidden="true">
          <div className="relative w-px" style={lineStyle}>
          {/* Base line */}
          <div className="absolute inset-0 bg-stone opacity-15" />

          {/* Ink progress - gradient fade */}
          <motion.div
            style={{ scaleY: renderedProgress, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-sumi/25 via-sumi/20 to-sumi/15"
          />

          {/* Chapter stitches - subtle position markers (skip first, traveling dot shows active state) */}
          {markers.slice(1).map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * DELAY_MA,
                duration: DURATION_ATTENTION,
                ease: EASE_EMERGE,
              }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${m.p * 100}%` }}
            >
              {/* Simple marker dot - always subtle gray */}
              <div className="w-[4px] h-[4px] rounded-full bg-stone/20" />
            </motion.div>
          ))}

        </div>
      </div>

      {/* TRAVELING DOT */}
      {positionReady && (
        <div className="fixed inset-0 pointer-events-none z-[70]" aria-hidden="true">
          <motion.div
            animate={{ opacity: travelingDotSuppressed ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              style={{ top: dotTop }}
              className="absolute left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-persimmon shadow-[0_0_2px_0.5px_rgba(232,93,4,0.6),0_0_4px_1px_rgba(232,93,4,0.3),0_0_6px_2px_rgba(232,93,4,0.1)]"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
