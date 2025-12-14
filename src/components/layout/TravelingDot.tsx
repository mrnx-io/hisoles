"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";

const DETACH_SCROLL_PX = 120;

export function TravelingDot() {
  const { scrollY, scrollYProgress } = useScroll();
  const { logoDotTopY, travelingDotSuppressed } = useSpine();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);

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
    };
  }, []);

  // Map scroll (0-1) to vertical position (Logo height -> Footer height)
  const endY = viewportHeight ? viewportHeight * 0.94 : logoDotTopY;
  const travelEndPx = Math.max(scrollMax, DETACH_SCROLL_PX + 1);
  const top = useTransform(
    scrollY,
    [0, DETACH_SCROLL_PX, travelEndPx],
    [logoDotTopY, logoDotTopY, endY]
  );
  const smoothTop = useSpring(top, { damping: 20, stiffness: 80 });

  const glowIntensity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      <motion.div
        animate={{ opacity: travelingDotSuppressed ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.div
          style={{
            top: smoothTop,
            // Note: OKLCH value is inline because opacity (${v}) is scroll-interpolated (0.55→0.85)
            // This dynamic alpha cannot use a CSS variable. Color matches --color-persimmon.
            boxShadow: useTransform(
              glowIntensity,
              (v) => `0 0 18px oklch(62.8% 0.19 48 / ${v})`
            ),
          }}
          className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-persimmon rounded-full"
        />
      </motion.div>
    </div>
  );
}
