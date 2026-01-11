"use client"

import { motion } from "motion/react"
import { CHAPTERS } from "@/components/layout/chapters"
import { useSpine } from "@/components/layout/SpineProvider"
import { useScrollToSection } from "@/lib/animation"
import { cn } from "@/lib/utils"

export function ChapterRail() {
  const { activeChapter } = useSpine()
  const scrollTo = useScrollToSection()

  // Extract readable chapter name for aria-label (e.g., "00 THE VOID" -> "The Void")
  const getChapterName = (label: string) => {
    const name = label.replace(/^\d+\s+/, "") // Remove leading number
    return name.charAt(0) + name.slice(1).toLowerCase() // Title case
  }

  return (
    <nav
      aria-label="Page chapters"
      className="fixed top-1/2 right-6 z-[55] hidden -translate-y-1/2 flex-col gap-8 md:right-12 md:flex"
    >
      {CHAPTERS.map((chapter) => {
        const isActive = activeChapter === chapter.id

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollTo(chapter.id)}
            aria-current={isActive ? "location" : undefined}
            aria-label={`Navigate to ${getChapterName(chapter.label)}`}
            className="group relative flex h-6 items-center justify-end border-0 bg-transparent p-0 text-left"
          >
            {/* Label - slides in with blur on active */}
            <motion.span
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? -32 : 0,
                filter: isActive ? "blur(0px)" : "blur(4px)",
              }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="text-persimmon absolute right-0 origin-right font-mono text-[9px] tracking-widest whitespace-nowrap uppercase"
            >
              {chapter.label}
            </motion.span>

            {/* Kanji */}
            <div
              className={cn(
                "font-display absolute right-0 w-6 text-center text-xl leading-none transition-all duration-700 select-none",
                isActive
                  ? "text-sumi blur-0 scale-110"
                  : "text-stone/20 group-hover:text-stone/40 scale-90 blur-[0.5px]"
              )}
            >
              {chapter.kanji}
            </div>

            {/* Indicator dot */}
            <div
              className={cn(
                "absolute -right-3 h-1 w-1 rounded-full transition-all duration-500",
                isActive
                  ? "bg-persimmon shadow-[0_0_8px_var(--color-persimmon)]"
                  : "group-hover:bg-stone/30 bg-transparent"
              )}
            />
          </button>
        )
      })}

      {/* Vertical spine line */}
      <div className="bg-stone/5 absolute top-0 right-[11px] bottom-0 -z-10 w-px" />
    </nav>
  )
}
