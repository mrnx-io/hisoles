import { OfferArtifact } from "@/components/offer/OfferArtifact"
import { OfferSection } from "@/components/offer/OfferSection"

export function OfferHero() {
  return (
    <OfferSection id="main" className="border-t-0" innerClassName="py-20 md:py-28">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <p className="k-kicker">For long days on your feet</p>
          <h1 className="k-title k-title-xl mt-6">Engineered calm for the end of your shift.</h1>
          <p className="k-body mt-6 max-w-md text-sm md:text-base">
            Structured support + cushion that fits most shoes — backed by a 90-day guarantee and
            free returns.
          </p>

          <ul className="mt-8 space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                Feels steadier under load (work floors, concrete, long standing)
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                Cushion you don&apos;t sink through by hour 10
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">Easy sizing + simple exchanges</span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              data-checkout-link
              href="/checkout?add=rotation"
              className="bg-sumi text-washi font-body hover:bg-persimmon inline-flex h-14 items-center justify-center px-8 text-sm tracking-widest uppercase transition-colors"
            >
              Get 2 Pairs — $69
            </a>
            <a
              data-checkout-link
              href="/checkout?add=trial"
              className="border-stone/20 text-sumi font-body hover:border-persimmon inline-flex h-14 items-center justify-center border bg-transparent px-8 text-sm tracking-widest uppercase transition-colors"
            >
              Start with 1 Pair — $39
            </a>
          </div>

          <p className="k-whisper mt-6">90-day guarantee · free returns · rotation recommended</p>
        </div>

        <div className="relative">
          <OfferArtifact />

          <div className="border-stone/10 bg-washi/80 absolute right-0 bottom-6 left-0 mx-auto w-[min(92vw,420px)] border px-6 py-5 backdrop-blur">
            <p className="k-whisper">Most customers choose rotation</p>
            <p className="font-body text-sumi mt-2 text-sm leading-snug">
              Two pairs = one in the work shoes, one in everything else.
            </p>
          </div>
        </div>
      </div>
    </OfferSection>
  )
}
