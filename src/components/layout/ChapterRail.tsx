"use client";

import { motion } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";
import { cn } from "@/lib/utils";
import { CHAPTERS } from "@/components/layout/chapters";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Unified timing constants (match CSS tokens)
const DURATION_ATTENTION = 0.6;
const DURATION_WHISPER = 0.4;
const DELAY_MA = 0.08;
const EASE_EMERGE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ChapterRail() {
  const reducedMotion = usePrefersReducedMotion();
  const { activeChapter } = useSpine();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  // Extract readable chapter name for aria-label (e.g., "00 THE VOID" -> "The Void")
  const getChapterName = (label: string) => {
    const name = label.replace(/^\d+\s+/, ""); // Remove leading number
    return name.charAt(0) + name.slice(1).toLowerCase(); // Title case
  };

  return (
    <nav
      aria-label="Page chapters"
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[55] hidden md:flex flex-col gap-10"
    >
      {CHAPTERS.map((chapter) => {
        const isActive = activeChapter === chapter.id;

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollTo(chapter.id)}
            aria-current={isActive ? "location" : undefined}
            aria-label={`Navigate to ${getChapterName(chapter.label)}`}
            className="relative flex items-center justify-end group h-6 bg-transparent border-0 p-0 text-left"
          >
            {/* Label - slides in with blur on active */}
            <motion.span
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? -28 : 0,
                scale: isActive ? 1 : 0.92,
                filter: isActive ? "blur(0px)" : "blur(3px)",
              }}
              transition={{
                duration: reducedMotion ? 0 : DURATION_ATTENTION,
                delay: isActive && !reducedMotion ? DELAY_MA : 0,
                ease: EASE_EMERGE,
              }}
              className="absolute right-0 whitespace-nowrap font-mono text-[9px] tracking-widest text-persimmon/85 uppercase origin-right"
            >
              {chapter.label}
            </motion.span>

            {/* Kanji - scales and fades with synchronized timing */}
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.08 : 0.92,
                opacity: isActive ? 1 : 0.15,
                filter: isActive ? "blur(0px)" : "blur(0.3px)",
              }}
              transition={{
                duration: reducedMotion ? 0 : DURATION_ATTENTION,
                ease: EASE_EMERGE,
              }}
              className={cn(
                "font-kanji text-xl leading-none select-none absolute right-0 w-6 text-center",
                isActive ? "text-sumi" : "text-stone group-hover:opacity-25"
              )}
            >
              {chapter.kanji}
            </motion.div>

            {/* Indicator dot - ink drop effect */}
            <motion.div
              initial={false}
              animate={{
                width: isActive ? 4 : 2,
                height: isActive ? 4 : 2,
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                duration: reducedMotion ? 0 : DURATION_WHISPER,
                delay: isActive && !reducedMotion ? DELAY_MA * 1.5 : 0,
                ease: EASE_EMERGE,
              }}
              className={cn(
                "absolute -right-4 rounded-full",
                isActive
                  ? "bg-persimmon shadow-[0_0_8px_var(--color-persimmon-25)]"
                  : "bg-transparent"
              )}
            />
          </button>
        );
      })}

      {/* Vertical spine line */}
      <div className="absolute top-0 bottom-0 right-[11px] w-px bg-stone/5 -z-10" />
    </nav>
  );
}
