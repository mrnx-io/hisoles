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

  const scaleY = useTransform(scrollVelocity, [-2000, 0, 2000], [1.5, 1, 1.5]);
  const scaleX = useTransform(scrollVelocity, [-2000, 0, 2000], [0.8, 1, 0.8]);

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
          <div className="absolute inset-0 bg-stone opacity-15" />

          {/* Ink progress */}
          <motion.div
            style={{ scaleY: renderedProgress, transformOrigin: "top" }}
            className="absolute inset-0 bg-sumi opacity-20"
          />

          {/* Chapter stitches */}
          {markers.map((m) => {
            const isActive = activeChapter === m.id;
            return (
              <div
                key={m.id}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full transition-all duration-700",
                  isActive
                    ? "bg-persimmon shadow-[0_0_14px_var(--color-persimmon-50)] meridian-heartbeat"
                    : "bg-stone/20"
                )}
                style={{ top: `${m.p * 100}%` }}
              />
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
            {!reducedMotion && (
              <motion.svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
                animate={
                  isIdle ? { rotate: [0, 9, -6, 0], scale: [1, 1.03, 1] } : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle
                  cx="22"
                  cy="22"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-stone"
                  strokeLinecap="round"
                  strokeDasharray="60 40"
                />
              </motion.svg>
            )}

            <motion.div
              animate={
                reducedMotion
                  ? { scale: 1, boxShadow: "0 0 0px var(--color-persimmon-50)" }
                  : isIdle
                  ? {
                      scale: [1, 1.25, 1],
                      boxShadow: [
                        "0 0 0px var(--color-persimmon-50)",
                        "0 0 12px var(--color-persimmon-50)",
                        "0 0 0px var(--color-persimmon-50)",
                      ],
                    }
                  : { scale: 1, boxShadow: "0 0 0px var(--color-persimmon-50)" }
              }
              transition={
                reducedMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              className="w-[6px] h-[6px] bg-persimmon rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
