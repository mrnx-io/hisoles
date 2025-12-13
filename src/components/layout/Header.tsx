"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const { scrollY } = useScroll();
  const { openCart, totalItems } = useCart();

  // Header fades out as user descends into "The Void"
  const opacity = useTransform(scrollY, [0, 60], [1, 0]);
  const y = useTransform(scrollY, [0, 60], [0, -20]);

  return (
    <motion.header
      style={{ opacity, y }}
      className="fixed top-0 w-full z-40 px-6 py-8 md:px-12 flex justify-between items-center pointer-events-none mix-blend-multiply"
    >
      {/* THE CENTERED ANCHOR - 'i' aligned to Meridian Line */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto select-none">
        <h1 className="font-display font-medium text-3xl tracking-tight-logo text-sumi whitespace-nowrap relative">
          {/* Left side: 'h' */}
          <span className="absolute right-full mr-[1px]">h</span>

          {/* Center Anchor: 'i' */}
          <span className="relative text-sumi">
            i
            {/* The Header Dot (Static) - Disappears when scrolling starts */}
            <span className="absolute top-[0.18em] left-[62%] -translate-x-1/2 w-[6px] h-[6px] bg-persimmon rounded-full" />
          </span>

          {/* Right side: 'soles' */}
          <span className="ml-[1px]">soles</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-between items-center pointer-events-auto">
        <div className="hidden md:block font-mono text-[10px] text-stone tracking-widest uppercase opacity-60">
          Engineered Calm
        </div>
        <button
          onClick={openCart}
          className="ml-auto group flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-persimmon transition-colors"
        >
          Shop{" "}
          <span className="text-stone group-hover:text-persimmon transition-colors">
            ({totalItems})
          </span>
        </button>
      </div>
    </motion.header>
  );
}
