"use client";

import { motion } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";

export function MeridianLine() {
  const { logoDotBottomY } = useSpine();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[15] flex justify-center"
      aria-hidden="true"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{
          marginTop: logoDotBottomY,
          height: `calc(100% - ${logoDotBottomY}px)`,
          transformOrigin: "top",
        }}
        className="w-[1px] bg-stone opacity-15"
      />
    </div>
  );
}
