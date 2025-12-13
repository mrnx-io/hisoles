"use client";

import { motion } from "motion/react";

export function SectionVoid() {
  return (
    <section className="h-screen w-full flex items-center justify-center relative z-10 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        className="text-center bg-washi/80 p-6 backdrop-blur-sm"
      >
        <p className="font-body font-light text-2xl md:text-4xl text-sumi tracking-tight leading-[0.95]">
          the art of standing
        </p>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 text-[11px] font-mono text-stone uppercase tracking-wide-cta"
      >
        Descend
      </motion.div>
    </section>
  );
}
