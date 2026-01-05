import { OfferArtifact } from "@/components/offer/OfferArtifact"
import { OfferSection } from "@/components/offer/OfferSection"

export function OfferMechanism() {
  return (
    <OfferSection id="why" innerClassName="py-20 md:py-24">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div className="order-2 md:order-1">
          <p className="k-kicker">Why it works</p>
          <h2 className="k-title k-title-md mt-5">Support that doesn&apos;t vanish.</h2>
          <p className="k-body mt-6 max-w-md text-sm">
            Foam compresses. Architecture holds. Hisoles is built to keep its shape while your day
            takes everything else.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <p className="font-body text-sumi text-base font-medium">1) Structural frame</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Steady arch support that resists &ldquo;mushing out&rdquo; over time.
              </p>
            </div>
            <div>
              <p className="font-body text-sumi text-base font-medium">2) Heel cup stability</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                A more grounded landing — especially on hard floors.
              </p>
            </div>
            <div>
              <p className="font-body text-sumi text-base font-medium">3) Quiet cushion</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Comfort you notice without feeling like you&apos;re standing on a pillow.
              </p>
            </div>
          </div>

          <p className="k-whisper mt-10">
            Tip: give it 1–3 shifts to settle in. Exchange is simple.
          </p>
        </div>

        <div className="order-1 md:order-2">
          <OfferArtifact className="md:ml-auto" />
        </div>
      </div>
    </OfferSection>
  )
}
