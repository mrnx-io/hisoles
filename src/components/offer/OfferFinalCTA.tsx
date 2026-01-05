import { OfferSection } from "@/components/offer/OfferSection"

export function OfferFinalCTA() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="k-kicker">Ready</p>
        <h2 className="k-title k-title-xl mt-5">Make the last hours easier.</h2>
        <p className="k-body mx-auto mt-6 max-w-lg text-sm md:text-base">
          Two pairs is the simplest way to keep relief consistent across shoes.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="bg-sumi text-washi font-body hover:bg-persimmon inline-flex h-14 items-center justify-center px-10 text-sm tracking-widest uppercase transition-colors"
          >
            Get 2 Pairs — $69
          </a>
          <a
            data-checkout-link
            href="/checkout?add=trial"
            className="border-stone/20 text-sumi font-body hover:border-persimmon inline-flex h-14 items-center justify-center border bg-transparent px-10 text-sm tracking-widest uppercase transition-colors"
          >
            Start with 1 Pair — $39
          </a>
        </div>

        <p className="k-whisper mt-8">90-day guarantee · free returns</p>
      </div>
    </OfferSection>
  )
}
