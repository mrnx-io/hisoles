"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";

export function Header() {
  const { scrollY } = useScroll();
  const { setLogoDotTopY, setLogoDotBottomY } = useSpine();
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateMeridianOrigin = () => {
      if (!dotRef.current) return;
      const rect = dotRef.current.getBoundingClientRect();
      setLogoDotTopY(rect.top);
      setLogoDotBottomY(rect.bottom);
    };

    const raf = requestAnimationFrame(updateMeridianOrigin);
    const raf2 = requestAnimationFrame(updateMeridianOrigin);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(updateMeridianOrigin);
    }
    window.addEventListener("resize", updateMeridianOrigin);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", updateMeridianOrigin);
    };
  }, [setLogoDotBottomY, setLogoDotTopY]);

  // As you scroll: "soles" fades away. The Persimmon dot is rendered by TravelingDot.
  const solesOpacity = useTransform(scrollY, [0, 120], [1, 0]);
  const hiOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  return (
    <motion.header
      className="fixed top-0 w-full z-40 px-6 py-8 md:px-12 pointer-events-none mix-blend-multiply"
    >
      {/* LOGO - TOP-CENTER (per spec: "The logo hisoles sits Top-Center") */}
      <div className="w-full pointer-events-auto select-none">
        <h1
          className="font-display font-medium text-3xl tracking-tight-logo text-sumi whitespace-nowrap"
          aria-label="hisoles"
        >
          {/* The 'i' is centered on the screen (the Meridian), so the dot becomes the origin of the Spine */}
          <span className="grid grid-cols-[1fr_auto_1fr] items-baseline">
            <motion.span style={{ opacity: hiOpacity }} className="justify-self-end">
              h
            </motion.span>
            <motion.span
              style={{
                opacity: hiOpacity,
                marginLeft: "var(--tracking-tight-logo)",
                marginRight: "var(--tracking-tight-logo)",
              }}
              className="relative justify-self-center"
            >
              ı
              {/* Anchor for the logo dot (the visible dot is the TravelingDot) */}
              <span
                ref={dotRef}
                className="absolute top-[0.18em] left-1/2 -translate-x-1/2 w-[6px] h-[6px] opacity-0"
                aria-hidden="true"
              />
            </motion.span>
            <motion.span style={{ opacity: solesOpacity }} className="justify-self-start">
              soles
            </motion.span>
          </span>
        </h1>
      </div>
    </motion.header>
  );
}
