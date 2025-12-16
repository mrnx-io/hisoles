"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useSpine, type ChapterId } from "@/components/layout/SpineProvider";
import { cn } from "@/lib/utils";
import { PaperFrame } from "@/components/layout/PaperFrame";

interface KakemonoSectionProps {
  id: ChapterId;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
  background?: ReactNode;
  ornaments?: ReactNode;
  frame?: boolean; // Paper welding layer
}

export function KakemonoSection({
  id,
  children,
  className,
  bleed = false,
  background,
  ornaments,
  frame = true,
}: KakemonoSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { setActiveChapter } = useSpine();

  // Lower threshold (0.25) ensures shorter sections like SectionDecay still trigger
  const isInView = useInView(ref, { amount: 0.25 });

  useEffect(() => {
    if (isInView) setActiveChapter(id);
  }, [isInView, id, setActiveChapter]);

  return (
    <section
      ref={ref}
      id={id}
      data-chapter={id}
      className={cn(
        "relative w-full flex flex-col items-center",
        "min-h-[100svh]",
        "scroll-mt-28 md:scroll-mt-32",
        bleed ? "px-0" : "px-6 md:px-12",
        "border-t border-stone/5",
        className
      )}
    >
      {/* Background slot */}
      {background ? <div className="absolute inset-0 -z-30">{background}</div> : null}

      {/* Paper welding (edges + crease) */}
      {frame ? <div className="absolute inset-0 -z-20"><PaperFrame /></div> : null}

      {/* Meridian guide anchor (global MeridianSystem draws the real spine) */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px -z-10" />

      {/* Ornaments anchored to section root */}
      {ornaments ? (
        <div className="absolute inset-0 pointer-events-none z-20">{ornaments}</div>
      ) : null}

      <div className={cn("w-full relative z-10", !bleed && "max-w-7xl")}>
        {children}
      </div>
    </section>
  );
}
