import { cn } from "@/lib/utils"

interface OfferArtifactProps {
  className?: string
}

export function OfferArtifact({ className }: OfferArtifactProps) {
  return (
    <div
      className={cn("relative mx-auto h-[520px] w-[240px] md:h-[620px] md:w-[290px]", className)}
      style={{
        WebkitMaskImage: "url(/insole-mask.svg)",
        maskImage: "url(/insole-mask.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden="true"
    >
      <div className="bg-charcoal absolute inset-0 overflow-hidden shadow-2xl">
        <div className="bg-persimmon/12 absolute inset-0" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, var(--color-washi-08) 0, var(--color-washi-08) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, var(--color-washi-08) 0, var(--color-washi-08) 1px, transparent 1px, transparent 6px)",
          }}
        />

        <div className="absolute inset-x-0 top-16 px-8 text-center">
          <span className="k-kicker text-washi/60">Structured support</span>
          <span className="k-whisper text-washi/50 mt-2 block">quiet cushion · steady arch</span>
        </div>

        <div className="bg-persimmon/80 absolute inset-x-10 bottom-24 h-28 rounded-[999px] blur-2xl" />
      </div>

      <div
        className="bg-washi/10 absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
        aria-hidden="true"
      />
    </div>
  )
}
