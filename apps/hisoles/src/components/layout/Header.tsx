"use client"

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useOverlay } from "@/components/layout/OverlayProvider"
import { useSpine } from "@/components/layout/SpineProvider"
import { useScrollToSection } from "@/lib/animation"
import { selectTotalItems, useCartStore } from "@/stores/cart-store"

const DETACH_SCROLL_PX = 120

export function Header() {
  const { scrollY } = useScroll()

  const { setLogoDotTopY } = useSpine()
  const openCart = useCartStore((s) => s.openCart)
  const totalItems = useCartStore(selectTotalItems)
  const { openPanel } = useOverlay()
  const scrollTo = useScrollToSection()

  const dotRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const [dimHeader, setDimHeader] = useState(false)
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current
    lastY.current = y

    if (y < 24) setDimHeader(false)
    else if (delta > 8) setDimHeader(true)
    else if (delta < -8) setDimHeader(false)
  })

  useEffect(() => {
    const updateMeridianOrigin = () => {
      if (!dotRef.current) return
      const rect = dotRef.current.getBoundingClientRect()
      setLogoDotTopY(rect.top)
    }

    const raf = requestAnimationFrame(updateMeridianOrigin)

    if (document.fonts?.ready) {
      void document.fonts.ready.then(updateMeridianOrigin)
    }

    window.addEventListener("resize", updateMeridianOrigin)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", updateMeridianOrigin)
    }
  }, [setLogoDotTopY])

  const solesOpacity = useTransform(scrollY, [0, DETACH_SCROLL_PX], [1, 0])
  const hiOpacity = useTransform(scrollY, [0, DETACH_SCROLL_PX * 1.5], [1, 0])

  return (
    <motion.header
      ref={headerRef}
      animate={{ opacity: dimHeader ? 0.18 : 1 }}
      transition={{ duration: 0.35, ease: "circOut" }}
      className="pointer-events-none fixed top-0 z-[60] w-full px-6 py-6 md:px-12"
    >
      {/* Skip link (keyboard trust) */}
      <a
        href="#main"
        className="bg-washi border-stone/20 tracking-wide-cta text-sumi pointer-events-auto sr-only border px-4 py-3 font-mono text-[10px] uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9990]"
      >
        Skip to content
      </a>

      <div className="pointer-events-auto grid grid-cols-[1fr_auto_1fr] items-center select-none">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => openPanel("about")}
            className="tracking-wide-cta text-stone/70 hover:text-persimmon font-mono text-[10px] uppercase transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => openPanel("faq")}
            className="tracking-wide-cta text-stone/70 hover:text-persimmon hidden font-mono text-[10px] uppercase transition-colors sm:inline"
          >
            FAQ
          </button>
        </div>

        {/* Center logo (Meridian anchor) */}
        <h1
          className="font-display tracking-tight-logo text-sumi text-3xl font-medium whitespace-nowrap"
          aria-label="hisoles"
        >
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
                className="absolute top-[4px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 opacity-0"
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
            className="tracking-wide-cta text-stone/70 hover:text-persimmon font-mono text-[10px] uppercase transition-colors"
          >
            Shop
          </button>

          <button
            type="button"
            onClick={openCart}
            className="tracking-wide-cta text-stone/70 hover:text-persimmon relative font-mono text-[10px] uppercase transition-colors"
            aria-label="Open cart"
          >
            Cart
            {totalItems > 0 ? (
              <span className="bg-persimmon text-washi absolute -top-2 -right-3 grid h-4 w-4 place-items-center rounded-full text-[9px]">
                {totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </motion.header>
  )
}
