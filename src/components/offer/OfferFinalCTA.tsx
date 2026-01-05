import { MiniTestimonial } from "@/components/offer/MiniTestimonial"
import { OfferSection } from "@/components/offer/OfferSection"
import { TrustRow } from "@/components/offer/TrustRow"

export function OfferFinalCTA() {
  return (
    <OfferSection innerClassName="py-14 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="k-kicker text-persimmon">The no-brainer test</p>
        <h2 className="k-title k-title-xl mt-5">$39 to find out if this ends your foot pain.</h2>
        <p className="k-body mx-auto mt-6 max-w-lg text-sm md:text-base">
          That&apos;s less than one chiropractor visit. And if they don&apos;t work? Full refund.
          You literally can&apos;t lose.
        </p>

        {/* Value comparison */}
        <div className="border-stone/10 bg-stone/5 mx-auto mt-8 max-w-md border p-6">
          <p className="k-whisper">What $39 gets you elsewhere:</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="font-body text-stone flex items-center justify-between">
              <span>Half a chiropractor visit</span>
              <span className="text-stone/50 font-mono text-xs">~$75-150</span>
            </li>
            <li className="font-body text-stone flex items-center justify-between">
              <span>1/10th of custom orthotics</span>
              <span className="text-stone/50 font-mono text-xs">~$300-800</span>
            </li>
            <li className="font-body text-sumi flex items-center justify-between font-medium">
              <span>Full 90-day test of these</span>
              <span className="text-persimmon font-mono text-sm">$39</span>
            </li>
          </ul>
        </div>

        <MiniTestimonial className="mx-auto mt-10" variant="highlighted" />

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            data-checkout-link
            href="/checkout?add=trial"
            className="bg-sumi text-washi font-body hover:bg-persimmon inline-flex h-14 items-center justify-center px-10 text-sm tracking-widest uppercase transition-colors"
          >
            Test 1 Pair — $39
          </a>
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="border-stone/20 text-sumi font-body hover:border-persimmon inline-flex h-14 items-center justify-center border bg-transparent px-10 text-sm tracking-widest uppercase transition-colors"
          >
            Or Get 3 Pairs — $69
          </a>
        </div>

        <TrustRow className="mt-8" showRating />

        <p className="k-whisper mt-4">90-day guarantee · Free returns · Ships in 1-2 days</p>
      </div>
    </OfferSection>
  )
}
