"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
} from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";
import { CHAPTERS } from "@/components/layout/chapters";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const DETACH_SCROLL_PX = 120;

// Unified timing constants (match CSS tokens)
const DURATION_BREATH = 3.6;
const DURATION_ATTENTION = 0.6;
const DELAY_MA = 0.08;
const EASE_EMERGE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_BREATH: [number, number, number, number] = [0.37, 0, 0.63, 1];

type Marker = { id: string; p: number };

export function MeridianSystem() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const { logoDotTopY, logoDotBottomY, travelingDotSuppressed, activeChapter } =
    useSpine();

  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const [markers, setMarkers] = useState<Marker[]>([]);

  const [isIdle, setIsIdle] = useState(true);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (reducedMotion) return;

    if (Math.abs(latest) > 5) {
      setIsIdle(false);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    } else if (!idleTimeoutRef.current) {
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        idleTimeoutRef.current = null;
      }, 1200);
    }
  });

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.removeAttribute("data-meridian-idle");
      return;
    }

    document.documentElement.setAttribute("data-meridian-idle", isIdle ? "true" : "false");

    return () => {
      document.documentElement.removeAttribute("data-meridian-idle");
    };
  }, [isIdle, reducedMotion]);

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight;
      const max = Math.max(0, document.documentElement.scrollHeight - vh);
      setViewportHeight(vh);
      setScrollMax(max);

      if (max <= 0) return;

      const nextMarkers: Marker[] = CHAPTERS.map((c) => {
        const el = document.getElementById(c.id);
        if (!el) return { id: c.id, p: 0 };
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { id: c.id, p: Math.max(0, Math.min(1, top / max)) };
      });

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
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  const travelEndPx = Math.max(scrollMax, DETACH_SCROLL_PX + 1);
  const endY = viewportHeight ? viewportHeight * 0.94 : logoDotTopY;

  const dotTop = useTransform(
    scrollY,
    [0, DETACH_SCROLL_PX, travelEndPx],
    [logoDotTopY, logoDotTopY, endY]
  );
  const smoothDotTop = useSpring(dotTop, { damping: 20, stiffness: 90, mass: 0.4 });
  const renderedDotTop = reducedMotion ? dotTop : smoothDotTop;

  const progress = useTransform(scrollY, [DETACH_SCROLL_PX, travelEndPx], [0, 1]);
  const smoothProgress = useSpring(progress, { damping: 30, stiffness: 160, mass: 0.25 });
  const renderedProgress = reducedMotion ? progress : smoothProgress;

  const scaleY = useTransform(scrollVelocity, [-2000, 0, 2000], [1.4, 1, 1.4]);
  const scaleX = useTransform(scrollVelocity, [-2000, 0, 2000], [0.85, 1, 0.85]);

  const lineStyle = useMemo(
    () => ({
      marginTop: logoDotBottomY,
      height: `calc(100% - ${logoDotBottomY}px)`,
    }),
    [logoDotBottomY]
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

          {/* Chapter stitches - differentiated markers */}
          {markers.map((m, index) => {
            const isActive = activeChapter === m.id;
            return (
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
                {/* Outer ring (active only) */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: DURATION_ATTENTION * 0.7, ease: EASE_EMERGE }}
                  className="absolute w-3 h-3 -left-[4.5px] -top-[4.5px] rounded-full border border-persimmon/30"
                />
                {/* Inner dot */}
                <div
                  className={cn(
                    "w-[5px] h-[5px] rounded-full transition-all",
                    isActive
                      ? "bg-persimmon shadow-[0_0_8px_var(--color-persimmon-50)] meridian-heartbeat"
                      : "bg-stone/25"
                  )}
                  style={{ transitionDuration: `${DURATION_ATTENTION * 1000}ms` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* TRAVELING DOT (pulse) */}
      <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
        <motion.div
          animate={{ opacity: travelingDotSuppressed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={{
              top: renderedDotTop,
              scaleX: reducedMotion ? 1 : scaleX,
              scaleY: reducedMotion ? 1 : scaleY,
            }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            {/* Ink wash halo (replaces SVG ring) - washi-inspired watercolor bleed */}
            {!reducedMotion && (
              <motion.div
                animate={
                  isIdle
                    ? { scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }
                    : { scale: 1, opacity: 0 }
                }
                transition={{
                  duration: DURATION_BREATH,
                  repeat: Infinity,
                  ease: EASE_BREATH,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
                style={{
                  background: `radial-gradient(
                    circle,
                    var(--color-persimmon-25) 0%,
                    var(--color-persimmon-25) 15%,
                    transparent 60%
                  )`,
                  filter: "blur(4px)",
                }}
              />
            )}

            {/* Core dot - refined breathing */}
            <motion.div
              animate={
                reducedMotion
                  ? { scale: 1, boxShadow: "0 0 0px var(--color-persimmon-50)" }
                  : isIdle
                  ? {
                      scale: [1, 1.18, 1],
                      boxShadow: [
                        "0 0 0px var(--color-persimmon-50)",
                        "0 0 10px var(--color-persimmon-50)",
                        "0 0 0px var(--color-persimmon-50)",
                      ],
                    }
                  : { scale: 1, boxShadow: "0 0 0px var(--color-persimmon-50)" }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: DURATION_BREATH, repeat: Infinity, ease: EASE_BREATH }
              }
              className="w-[5px] h-[5px] bg-persimmon rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
