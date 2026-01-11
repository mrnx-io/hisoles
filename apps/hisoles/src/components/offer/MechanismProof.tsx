import { cn } from "@/lib/utils"

interface MechanismProofProps {
  className?: string
}

export function MechanismProof({ className }: MechanismProofProps) {
  return (
    <div className={cn("mx-auto max-w-md", className)}>
      {/* Visual comparison card */}
      <div className="border-stone/10 bg-washi overflow-hidden border shadow-[0_8px_30px_rgba(26,26,26,0.08)]">
        {/* Header */}
        <div className="bg-stone/5 border-stone/10 border-b px-6 py-4">
          <p className="k-kicker text-center">Hour 1 vs. Hour 10</p>
        </div>

        {/* Comparison grid */}
        <div className="divide-stone/10 grid grid-cols-2 divide-x">
          {/* Foam-only (bad) */}
          <div className="p-6">
            <div className="text-center">
              <p className="text-stone/60 font-mono text-[10px] tracking-widest uppercase">
                Foam-only insoles
              </p>

              {/* Visual: Foam compressing over time */}
              <div className="mt-5 space-y-3">
                {/* Hour 1: Full height */}
                <div className="flex items-end justify-center gap-2">
                  <span className="text-stone/40 font-mono text-[9px]">1h</span>
                  <div className="bg-stone/25 h-8 w-16 rounded-t-lg" />
                </div>
                {/* Hour 6: Compressed */}
                <div className="flex items-end justify-center gap-2">
                  <span className="text-stone/40 font-mono text-[9px]">6h</span>
                  <div className="bg-stone/20 h-4 w-16 rounded-t-md" />
                </div>
                {/* Hour 10: Flat */}
                <div className="flex items-end justify-center gap-2">
                  <span className="text-stone/50 font-mono text-[9px]">10h</span>
                  <div className="bg-stone/15 h-2 w-16 rounded-t-sm" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                <svg
                  className="text-stone/40 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                </svg>
                <p className="text-stone/50 text-xs">Compresses flat</p>
              </div>
            </div>
          </div>

          {/* Frame-First (good) */}
          <div className="bg-persimmon/5 p-6">
            <div className="text-center">
              <p className="text-persimmon font-mono text-[10px] tracking-widest uppercase">
                Hisoles (Frame-First)
              </p>

              {/* Visual: Structure maintains shape */}
              <div className="mt-5 space-y-3">
                {/* Hour 1: Full structure */}
                <div className="flex items-end justify-center gap-2">
                  <span className="text-persimmon/50 font-mono text-[9px]">1h</span>
                  <div className="relative h-8 w-16">
                    <div className="bg-persimmon/60 absolute bottom-0 h-2 w-full rounded" />
                    <div className="bg-persimmon absolute bottom-1.5 h-6 w-full rounded-t-xl" />
                  </div>
                </div>
                {/* Hour 6: Still holding */}
                <div className="flex items-end justify-center gap-2">
                  <span className="text-persimmon/50 font-mono text-[9px]">6h</span>
                  <div className="relative h-8 w-16">
                    <div className="bg-persimmon/60 absolute bottom-0 h-2 w-full rounded" />
                    <div className="bg-persimmon absolute bottom-1.5 h-6 w-full rounded-t-xl" />
                  </div>
                </div>
                {/* Hour 10: Still holding */}
                <div className="flex items-end justify-center gap-2">
                  <span className="text-persimmon/60 font-mono text-[9px]">10h</span>
                  <div className="relative h-8 w-16">
                    <div className="bg-persimmon/60 absolute bottom-0 h-2 w-full rounded" />
                    <div className="bg-persimmon absolute bottom-1.5 h-6 w-full rounded-t-xl" />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5">
                <svg
                  className="text-persimmon h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-persimmon text-xs font-medium">Holds shape</p>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture breakdown — simplified */}
        <div className="border-stone/10 border-t px-6 py-5">
          <p className="k-whisper mb-4 text-center">What&apos;s inside</p>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="bg-persimmon mx-auto h-3 w-10 rounded-t-lg" />
              <p className="text-stone mt-2 text-[10px]">Frame</p>
            </div>
            <div className="text-center">
              <div className="bg-persimmon/60 border-persimmon/80 mx-auto h-3 w-6 rounded-full border-2" />
              <p className="text-stone mt-2 text-[10px]">Heel cup</p>
            </div>
            <div className="text-center">
              <div className="bg-persimmon/30 mx-auto h-3 w-10 rounded" />
              <p className="text-stone mt-2 text-[10px]">Cushion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Callout */}
      <p className="k-whisper mt-4 text-center">Same support at hour 10 as hour 1.</p>
    </div>
  )
}
