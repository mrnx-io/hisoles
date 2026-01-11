import { Star } from "lucide-react"
import Image from "next/image"
import { IMAGE_BLUR } from "@/components/offer/image-blur"
import { cn } from "@/lib/utils"

const STAR_POSITIONS = [0, 1, 2, 3, 4] as const

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
  avatar: "/product/proof-4.png",
  blur: IMAGE_BLUR.proof4,
} as const

export function MiniTestimonial({ className, variant = "default" }: MiniTestimonialProps) {
  return (
    <div
      className={cn(
        "border-stone/10 mx-auto max-w-sm border px-5 py-5",
        variant === "highlighted" && "bg-persimmon/5 border-persimmon/20",
        className
      )}
    >
      {/* Avatar + stars header */}
      <div className="mb-3 flex items-center justify-center gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src={MINI_QUOTE.avatar}
            alt={MINI_QUOTE.name}
            fill
            sizes="36px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={MINI_QUOTE.blur}
          />
        </div>
        <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
          {STAR_POSITIONS.map((pos) => (
            <Star
              key={`mini-star-${pos}`}
              className="fill-persimmon text-persimmon h-3.5 w-3.5"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <blockquote className="font-body text-sumi text-center text-sm leading-relaxed">
        &ldquo;{MINI_QUOTE.text}&rdquo;
      </blockquote>
      <p className="text-stone/60 mt-3 text-center font-mono text-[11px] tracking-wider uppercase">
        {MINI_QUOTE.name} · {MINI_QUOTE.role} · {MINI_QUOTE.shift}
      </p>
    </div>
  )
}
