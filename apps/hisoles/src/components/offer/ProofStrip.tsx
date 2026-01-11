import { Star } from "lucide-react"
import Image from "next/image"
import { IMAGE_BLUR } from "@/components/offer/image-blur"
import { cn } from "@/lib/utils"

const STAR_POSITIONS = [0, 1, 2, 3, 4] as const

const AVATARS = [
  { src: "/product/proof-1.webp", alt: "Nina R., ER Nurse", blur: IMAGE_BLUR.proof1 },
  { src: "/product/proof-2.webp", alt: "Mike D., Construction", blur: IMAGE_BLUR.proof2 },
  { src: "/product/proof-3.png", alt: "Healthcare worker", blur: IMAGE_BLUR.proof3 },
]

interface ProofStripProps {
  className?: string
  variant?: "default" | "compact"
}

export function ProofStrip({ className, variant = "default" }: ProofStripProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-center gap-3", className)}>
        {/* Mini avatars */}
        <div className="flex -space-x-2">
          {AVATARS.map((avatar) => (
            <div
              key={avatar.src}
              className="border-washi relative h-7 w-7 overflow-hidden rounded-full border-2 shadow-sm"
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                sizes="28px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={avatar.blur}
              />
            </div>
          ))}
        </div>
        {/* Inline star rating for compact variant */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5" role="img" aria-label="4.8 out of 5 stars">
            {STAR_POSITIONS.map((pos) => (
              <Star
                key={`compact-star-${pos}`}
                className="fill-persimmon text-persimmon h-3.5 w-3.5"
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sumi font-mono text-[11px] font-medium">4.8</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "border-stone/10 bg-washi/80 mx-auto max-w-md border px-5 py-4 backdrop-blur",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Avatars representing multiple personas - larger for mobile visibility */}
        <div className="flex -space-x-3">
          {AVATARS.map((avatar) => (
            <div
              key={avatar.src}
              className="border-washi relative h-11 w-11 overflow-hidden rounded-full border-2 shadow-sm"
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                sizes="44px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={avatar.blur}
              />
            </div>
          ))}
        </div>

        <div className="flex-1">
          {/* Star rating first - most scannable */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5" role="img" aria-label="4.8 out of 5 stars">
              {STAR_POSITIONS.map((pos) => (
                <Star
                  key={`proof-star-${pos}`}
                  className="fill-persimmon text-persimmon h-4 w-4"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sumi font-mono text-xs font-medium">4.8/5</span>
          </div>
          <p className="font-body text-sumi mt-1 text-sm font-medium">
            Shift-tested by 2,500+ workers
          </p>
          <p className="text-stone/70 mt-1 font-mono text-[10px] tracking-widest uppercase">
            Healthcare · Warehouse · Construction
          </p>
        </div>
      </div>
    </div>
  )
}
