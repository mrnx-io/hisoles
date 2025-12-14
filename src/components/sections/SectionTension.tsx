"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function SectionTension() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const rightOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

  return (
    <section
      ref={ref}
      className="min-h-[180vh] w-full relative overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex">
        {/* LEFT: Hour 1 (sharp, pristine) */}
        <div className="w-1/2 bg-washi flex items-center justify-end pr-6 md:pr-16">
          <motion.div style={{ opacity: leftOpacity }} className="max-w-sm text-right">
            <p className="font-mono text-[10px] text-stone uppercase tracking-wide-cta">
              HOUR 1
            </p>
            <h2 className="font-body font-light text-4xl md:text-6xl text-sumi leading-[0.95] mt-5">
              Sharp.
              <br />
              <span className="text-stone">Pristine.</span>
            </h2>
          </motion.div>
        </div>

        {/* RIGHT: Hour 10 (blurred, vibrating) */}
        <div className="w-1/2 bg-stone/5 backdrop-blur-[2px] flex items-center justify-start pl-6 md:pl-16">
          <motion.div style={{ opacity: rightOpacity }} className="max-w-sm text-left">
            <p className="font-mono text-[10px] text-stone uppercase tracking-wide-cta">
              HOUR 10
            </p>
            <h2 className="font-body font-light text-4xl md:text-6xl text-sumi leading-[0.95] mt-5">
              <span className="blur-[2px] inline-block animate-[tremor_1.1s_ease-in-out_infinite]">
                Burning.
              </span>
              <br />
              <span className="blur-[2px] inline-block animate-[tremor_1.1s_ease-in-out_infinite] text-stone">
                Buzzing.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
