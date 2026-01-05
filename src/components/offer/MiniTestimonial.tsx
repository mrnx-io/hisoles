import { cn } from "@/lib/utils"

interface MiniTestimonialProps {
  className?: string
  variant?: "default" | "highlighted"
}

// Pull the most compelling short quote from existing testimonials
const MINI_QUOTE = {
  text: "The last few hours feel manageable — and the insoles don't feel crushed flat.",
  name: "Mike D.",
  role: "Construction",
  shift: "12h shifts",
} as const

export function MiniTestimonial({ className, variant = "default" }: MiniTestimonialProps) {
  return (
    <div
      className={cn(
        "border-stone/10 mx-auto max-w-sm border px-5 py-4",
        variant === "highlighted" && "bg-persimmon/5 border-persimmon/20",
        className
      )}
    >
      <blockquote className="font-body text-stone text-center text-sm leading-relaxed">
        &ldquo;{MINI_QUOTE.text}&rdquo;
      </blockquote>
      <p className="text-stone/60 mt-3 text-center font-mono text-[10px] tracking-widest uppercase">
        {MINI_QUOTE.name} · {MINI_QUOTE.role} · {MINI_QUOTE.shift}
      </p>
    </div>
  )
}
