import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface OfferSectionProps {
  id?: string
  children: ReactNode
  className?: string
  innerClassName?: string
  /** Softer border for better mobile scroll flow */
  softBorder?: boolean
}

export function OfferSection({
  id,
  children,
  className,
  innerClassName,
  softBorder = false,
}: OfferSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full border-t",
        softBorder ? "border-stone/[0.03]" : "border-stone/5",
        className
      )}
    >
      <div
        className="bg-stone/5 pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2"
        aria-hidden="true"
      />
      <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-12", innerClassName)}>{children}</div>
    </section>
  )
}
