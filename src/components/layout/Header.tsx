"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";
import { useCart } from "@/components/layout/CartProvider";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const DETACH_SCROLL_PX = 120;

export function Header() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const { setLogoDotTopY, setLogoDotBottomY, setLogoDotCenterX, setHeaderBottomY } = useSpine();
  const { openCart, totalItems } = useCart();
  const { openPanel } = useOverlay();

  const dotRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const [dimHeader, setDimHeader] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    lastY.current = y;

    if (y < 24) setDimHeader(false);
    else if (delta > 8) setDimHeader(true);
    else if (delta < -8) setDimHeader(false);
  });

  useEffect(() => {
    const updateMeridianOrigin = () => {
      if (!dotRef.current) return;
      const rect = dotRef.current.getBoundingClientRect();
      setLogoDotTopY(rect.top);
      setLogoDotBottomY(rect.bottom);
      setLogoDotCenterX(rect.left + rect.width / 2);

      // Measure header bottom for meridian line termination
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        setHeaderBottomY(headerRect.bottom);
      }
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
  }, [setLogoDotBottomY, setLogoDotTopY, setLogoDotCenterX, setHeaderBottomY]);

  const solesOpacity = useTransform(scrollY, [0, DETACH_SCROLL_PX], [1, 0]);
  const hiOpacity = useTransform(scrollY, [0, DETACH_SCROLL_PX * 1.5], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <motion.header
      ref={headerRef}
      animate={{ opacity: dimHeader ? 0.18 : 1 }}
      transition={{ duration: 0.35, ease: "circOut" }}
      className="fixed top-0 w-full z-[60] px-6 py-6 md:px-12 pointer-events-none"
    >
      {/* Skip link (keyboard trust) */}
      <a
        href="#main"
        className="pointer-events-auto sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9990] bg-washi border border-stone/20 px-4 py-3 font-mono text-[10px] uppercase tracking-wide-cta text-sumi"
      >
        Skip to content
      </a>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center pointer-events-auto select-none">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => openPanel("about")}
            className="font-mono text-[10px] uppercase tracking-wide-cta text-stone/70 hover:text-persimmon transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => openPanel("faq")}
            className="font-mono text-[10px] uppercase tracking-wide-cta text-stone/70 hover:text-persimmon transition-colors hidden sm:inline"
          >
            FAQ
          </button>
        </div>

        {/* Center logo (Meridian anchor) */}
        <h1 className="font-display font-medium text-3xl tracking-tight-logo text-sumi whitespace-nowrap" aria-label="hisoles">
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
              <span
                ref={dotRef}
                className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] opacity-0"
                aria-hidden="true"
              />
            </motion.span>

            <motion.span style={{ opacity: solesOpacity }} className="justify-self-start">
              soles
            </motion.span>
          </span>
        </h1>

        {/* Right */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => scrollTo("altar")}
            className="font-mono text-[10px] uppercase tracking-wide-cta text-stone/70 hover:text-persimmon transition-colors"
          >
            Shop
          </button>

          <button
            type="button"
            onClick={openCart}
            className="relative font-mono text-[10px] uppercase tracking-wide-cta text-stone/70 hover:text-persimmon transition-colors"
            aria-label="Open cart"
          >
            Cart
            {totalItems > 0 ? (
              <span className="absolute -top-2 -right-3 w-4 h-4 rounded-full bg-persimmon text-washi text-[9px] grid place-items-center">
                {totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
