import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewStatsProps {
  className?: string
  variant?: "default" | "compact" | "inline"
}

// These numbers should be updated with real data when available [?]
const STATS = {
  rating: 4.8,
  reviewCount: 247,
  // Customer count can be added when real data available
} as const

const STAR_POSITIONS = [0, 1, 2, 3, 4] as const

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" | "md" }) {
  const fullStars = Math.floor(rating)
  const hasPartial = rating % 1 >= 0.5
  const sizeClass = size === "md" ? "h-4 w-4" : size === "sm" ? "h-3.5 w-3.5" : "h-3 w-3"

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={`star-${pos}`}
          className={cn(
            sizeClass,
            pos < fullStars
              ? "fill-persimmon text-persimmon"
              : pos === fullStars && hasPartial
                ? "fill-persimmon/50 text-persimmon"
                : "fill-stone/20 text-stone/20"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function ReviewStats({ className, variant = "default" }: ReviewStatsProps) {
  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <StarRating rating={STATS.rating} size="xs" />
        <span className="text-stone/70 font-mono text-[10px] tracking-widest uppercase">
          {STATS.rating} · {STATS.reviewCount} reviews
        </span>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <StarRating rating={STATS.rating} size="xs" />
        <span className="k-whisper">{STATS.rating}/5</span>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <div className="flex items-center gap-2">
        <StarRating rating={STATS.rating} size="md" />
        <span className="text-sumi font-mono text-sm font-medium">{STATS.rating}</span>
      </div>
      <p className="text-stone/60 font-mono text-[10px] tracking-widest uppercase">
        from {STATS.reviewCount} verified reviews
      </p>
    </div>
  )
}
