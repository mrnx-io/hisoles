import { MiniTestimonial } from "@/components/offer/MiniTestimonial"
import { OfferSection } from "@/components/offer/OfferSection"
import { TrustRow } from "@/components/offer/TrustRow"

export function OfferFinalCTA() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="k-kicker">Before your next shift</p>
        <h2 className="k-title k-title-xl mt-5">Make hour 6 feel different.</h2>
        <p className="k-body mx-auto mt-6 max-w-lg text-sm md:text-base">
          Most people choose 2 pairs so support stays consistent across shoes — and you stop
          starting at zero.
        </p>

        <MiniTestimonial className="mx-auto mt-10" variant="highlighted" />

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
            Try 1 Pair — $39
          </a>
        </div>

        <TrustRow className="mt-8" showRating />

        <p className="k-whisper mt-4">Ships within 1-2 business days</p>

        <p className="k-whisper mt-3">
          Questions?{" "}
          <a href="mailto:support@hisoles.com" className="underline hover:no-underline">
            support@hisoles.com
          </a>
        </p>
      </div>
    </OfferSection>
  )
}
