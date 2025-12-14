"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function SectionVoid() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A single sentence fades in, centered on the Meridian.
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  return (
    <section ref={ref} className="h-[140vh] w-full relative z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.p
          style={{ opacity: textOpacity }}
          className="font-body font-light text-3xl md:text-5xl text-sumi tracking-tight leading-[0.95] text-center"
        >
          the art of standing
        </motion.p>
      </div>
    </section>
  );
}
