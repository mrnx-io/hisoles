"use client";

import { motion } from "motion/react";
import { useSpine } from "@/components/layout/SpineProvider";
import { cn } from "@/lib/utils";
import { CHAPTERS } from "@/components/layout/chapters";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function ChapterRail() {
  const reducedMotion = usePrefersReducedMotion();
  const { activeChapter } = useSpine();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav aria-label="Chapters" className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden md:flex flex-col gap-8">
      {CHAPTERS.map((chapter) => {
        const isActive = activeChapter === chapter.id;

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollTo(chapter.id)}
            aria-current={isActive ? "location" : undefined}
            className="relative flex items-center justify-end group h-6 bg-transparent border-0 p-0 text-left"
          >
            <motion.span
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? -24 : 0,
                filter: isActive ? "blur(0px)" : "blur(4px)",
              }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute right-0 whitespace-nowrap font-mono text-[9px] tracking-widest text-persimmon uppercase origin-right"
            >
              {chapter.label}
            </motion.span>

            <div
              className={cn(
                "font-display text-xl leading-none transition-all duration-700 select-none absolute right-0 w-6 text-center",
                isActive
                  ? "text-sumi scale-110 blur-0"
                  : "text-stone/20 scale-90 blur-[0.5px] group-hover:text-stone/40"
              )}
            >
              {chapter.kanji}
            </div>

            <div
              className={cn(
                "absolute -right-3 w-1 h-1 rounded-full transition-all duration-500",
                isActive
                  ? "bg-persimmon shadow-[0_0_8px_var(--color-persimmon)]"
                  : "bg-transparent group-hover:bg-stone/30"
              )}
            />
          </button>
        );
      })}

      <div className="absolute top-0 bottom-0 right-[11px] w-px bg-stone/5 -z-10" />
    </nav>
  );
}
