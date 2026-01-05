import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface OfferSectionProps {
  id?: string
  children: ReactNode
  className?: string
  innerClassName?: string
}

export function OfferSection({ id, children, className, innerClassName }: OfferSectionProps) {
  return (
    <section id={id} className={cn("border-stone/5 relative w-full border-t", className)}>
      <div
        className="bg-stone/5 pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-1/2"
        aria-hidden="true"
      />
      <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-12", innerClassName)}>{children}</div>
    </section>
  )
}
