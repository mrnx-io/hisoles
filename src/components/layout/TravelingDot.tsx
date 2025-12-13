"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";

export function TravelingDot() {
  const { scrollYProgress } = useScroll();

  // Map scroll (0-1) to vertical position (Logo height -> Footer height)
  const top = useTransform(scrollYProgress, [0, 1], ["44px", "94vh"]);
  const smoothTop = useSpring(top, { damping: 20, stiffness: 80 });

  // Fade in as the Header logo fades out
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Pulse at section transitions (roughly every 20% of scroll)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.22, 0.38, 0.42, 0.58, 0.62, 0.78, 0.82, 1],
    [1, 1, 1.4, 1, 1.4, 1, 1.4, 1, 1.4, 1]
  );
  const smoothScale = useSpring(scale, { damping: 15, stiffness: 100 });

  // Glow intensity builds toward CTA
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.7, 1]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 flex justify-center"
      aria-hidden="true"
    >
      <motion.div
        style={{
          top: smoothTop,
          opacity,
          scale: smoothScale,
          boxShadow: useTransform(
            glowIntensity,
            (v) => `0 0 ${15 + v * 10}px rgba(var(--color-persimmon-rgb),${0.4 + v * 0.3})`
          ),
        }}
        className="absolute w-2.5 h-2.5 bg-persimmon rounded-full"
      />
    </div>
  );
}
