import { OfferSection } from "@/components/offer/OfferSection"

export function OfferGuarantee() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="k-kicker">Risk reversal</p>
        <h2 className="k-title k-title-md mt-5">Try it for 90 days.</h2>
        <p className="k-body mt-6 text-sm md:text-base">
          If it&apos;s not for you, return it. Simple.
        </p>

        <div className="border-stone/10 bg-washi mt-12 border p-8 text-left">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="k-kicker">1</p>
              <p className="font-body text-sumi mt-3 text-sm font-medium">Wear it</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Put it through real shifts.
              </p>
            </div>
            <div>
              <p className="k-kicker">2</p>
              <p className="font-body text-sumi mt-3 text-sm font-medium">Decide</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Keep it if it earns its place.
              </p>
            </div>
            <div>
              <p className="k-kicker">3</p>
              <p className="font-body text-sumi mt-3 text-sm font-medium">Return</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                If not, send it back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </OfferSection>
  )
}
