"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValueEvent,
} from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";

const DETACH_SCROLL_PX = 120;

export function TravelingDot() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const { logoDotTopY, travelingDotSuppressed } = useSpine();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect Idleness (Breathing Room)
  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (Math.abs(latest) > 5) {
      setIsIdle(false);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    } else if (!idleTimeoutRef.current) {
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        idleTimeoutRef.current = null;
      }, 1200);
    }
  });

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);
      setScrollMax(Math.max(0, document.documentElement.scrollHeight - vh));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    const raf = requestAnimationFrame(update);
    const raf2 = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  // Map scroll to vertical position (Logo height -> Footer height)
  const endY = viewportHeight ? viewportHeight * 0.94 : logoDotTopY;
  const travelEndPx = Math.max(scrollMax, DETACH_SCROLL_PX + 1);
  const top = useTransform(
    scrollY,
    [0, DETACH_SCROLL_PX, travelEndPx],
    [logoDotTopY, logoDotTopY, endY]
  );
  const smoothTop = useSpring(top, { damping: 20, stiffness: 80 });

  // PHYSICS: Elongate vertically when moving fast (Speed lines aesthetic)
  const scaleY = useTransform(scrollVelocity, [-2000, 0, 2000], [1.5, 1, 1.5]);
  const scaleX = useTransform(scrollVelocity, [-2000, 0, 2000], [0.8, 1, 0.8]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      <motion.div
        animate={{ opacity: travelingDotSuppressed ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{ top: smoothTop, scaleX, scaleY }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          {/* Breathing Core */}
          <motion.div
            animate={
              isIdle
                ? {
                    scale: [1, 1.25, 1],
                    boxShadow: [
                      "0 0 0px var(--color-persimmon-50)",
                      "0 0 12px var(--color-persimmon-50)",
                      "0 0 0px var(--color-persimmon-50)",
                    ],
                  }
                : {
                    scale: 1,
                    boxShadow: "0 0 0px var(--color-persimmon-50)",
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[6px] h-[6px] bg-persimmon rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
