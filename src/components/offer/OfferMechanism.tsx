import { MechanismProof } from "@/components/offer/MechanismProof"
import { OfferSection } from "@/components/offer/OfferSection"

export function OfferMechanism() {
  return (
    <OfferSection id="why" innerClassName="py-20 md:py-24">
      {/* Header: Problem → Solution frame */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="k-kicker">Why most insoles fail</p>
        <h2 className="k-title k-title-md mt-5">Foam flattens. Structure holds.</h2>
        <p className="k-body mx-auto mt-5 max-w-lg text-sm md:text-base">
          Most insoles feel great for a week, then compress flat by hour 6. Hisoles uses a
          structural frame — not just foam — so support lasts through your whole shift.
        </p>
      </header>

      {/* 3-Step "How It Works" — simple, scannable */}
      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
        <div className="border-stone/10 bg-washi border p-6 text-center">
          <div className="bg-persimmon/10 text-persimmon mx-auto flex h-12 w-12 items-center justify-center rounded-full font-mono text-lg font-medium">
            1
          </div>
          <p className="font-body text-sumi mt-5 text-base font-medium">Frame holds your arch</p>
          <p className="font-body text-stone mt-2 text-sm leading-relaxed">
            A structural frame — not soft foam — keeps your arch supported even at hour 10.
          </p>
        </div>

        <div className="border-stone/10 bg-washi border p-6 text-center">
          <div className="bg-persimmon/10 text-persimmon mx-auto flex h-12 w-12 items-center justify-center rounded-full font-mono text-lg font-medium">
            2
          </div>
          <p className="font-body text-sumi mt-5 text-base font-medium">Heel cup grounds you</p>
          <p className="font-body text-stone mt-2 text-sm leading-relaxed">
            A deep heel seat cradles your heel for steadier steps on concrete and tile.
          </p>
        </div>

        <div className="border-stone/10 bg-washi border p-6 text-center">
          <div className="bg-persimmon/10 text-persimmon mx-auto flex h-12 w-12 items-center justify-center rounded-full font-mono text-lg font-medium">
            3
          </div>
          <p className="font-body text-sumi mt-5 text-base font-medium">Cushion stays quiet</p>
          <p className="font-body text-stone mt-2 text-sm leading-relaxed">
            Comfort you notice without feeling like you&apos;re standing on a marshmallow.
          </p>
        </div>
      </div>

      {/* Visual comparison: Foam vs Frame */}
      <div className="mt-16 grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div className="order-2 md:order-1">
          <p className="k-kicker">The difference you&apos;ll feel</p>
          <h3 className="k-title mt-5 text-xl md:text-2xl">
            Support from structure, not foam alone.
          </h3>
          <p className="font-body text-stone mt-5 max-w-md text-sm leading-relaxed">
            If you&apos;ve tried gel or foam insoles that felt amazing at first but flattened out
            after a few weeks — this is why. Foam compresses under constant pressure. A structural
            frame resists it.
          </p>

          {/* Mechanism statement — the "why it works" */}
          <div className="border-persimmon/30 bg-persimmon/5 mt-8 border-l-2 py-4 pr-6 pl-5">
            <p className="font-body text-sumi text-sm leading-relaxed">
              <span className="font-medium">Why it works:</span> Support comes from a structural
              frame that holds its shape — so your arch and heel stay steadier shift after shift,
              while foam-only insoles compress flat.
            </p>
          </div>

          <p className="k-whisper mt-6">
            Tip: give it 1–3 shifts to settle in. If sizing feels off, exchanges are simple.
          </p>
        </div>

        <div className="order-1 md:order-2">
          <MechanismProof className="md:ml-auto" />
        </div>
      </div>
    </OfferSection>
  )
}
