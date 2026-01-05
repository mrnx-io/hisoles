import { Star } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const STAR_POSITIONS = [0, 1, 2, 3, 4] as const

const AVATARS = [
  { src: "/ugc/echo-1.jpg", alt: "Healthcare worker" },
  { src: "/ugc/echo-2.jpg", alt: "Warehouse worker" },
  { src: "/ugc/echo-3.jpg", alt: "Service worker" },
] as const

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
              className="border-washi relative h-6 w-6 overflow-hidden rounded-full border-2"
            >
              <Image src={avatar.src} alt={avatar.alt} fill sizes="24px" className="object-cover" />
            </div>
          ))}
        </div>
        <p className="k-whisper">Built for 10-12h shifts on hard floors</p>
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
        {/* Avatars representing multiple personas */}
        <div className="flex -space-x-3">
          {AVATARS.map((avatar) => (
            <div
              key={avatar.src}
              className="border-washi relative h-9 w-9 overflow-hidden rounded-full border-2"
            >
              <Image src={avatar.src} alt={avatar.alt} fill sizes="36px" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-body text-sumi text-sm font-medium">
              Shift-tested by 2,500+ workers
            </p>
            <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
              {STAR_POSITIONS.map((pos) => (
                <Star
                  key={`proof-star-${pos}`}
                  className="fill-persimmon text-persimmon h-3 w-3"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="text-stone/70 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
            Healthcare · Warehouse · Construction · Hospitality · Retail
          </p>
        </div>
      </div>
    </div>
  )
}
