import { OfferSection } from "@/components/offer/OfferSection"

export function OfferBundles() {
  return (
    <OfferSection id="buy" innerClassName="py-20 md:py-24">
      <header className="text-center">
        <p className="k-kicker">Choose your ritual</p>
        <h2 className="k-title k-title-md mt-5">Pick your pair.</h2>
        <p className="k-body mx-auto mt-5 max-w-md text-sm">
          Rotation is best for 2+ shoes and longer life.
        </p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {/* 1 Pair */}
        <div className="bg-washi border-stone/15 flex flex-col border p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="k-kicker">Starter</p>
              <p className="font-body text-sumi mt-4 text-2xl font-light">1 Pair</p>
              <p className="k-body mt-3 text-sm">Try it on your next shift.</p>
            </div>
            <div className="text-right">
              <p className="text-sumi font-mono text-3xl">$39</p>
              <p className="k-whisper mt-2">trial</p>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-stone/30 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">Fits most shoes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-stone/30 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">Easy exchanges</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-stone/30 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">90-day guarantee</span>
            </li>
          </ul>

          <a
            data-checkout-link
            href="/checkout?add=trial"
            className="border-stone/20 text-sumi font-body hover:border-persimmon mt-10 inline-flex h-14 w-full items-center justify-center border bg-transparent text-sm tracking-widest uppercase transition-colors"
          >
            Get 1 Pair
          </a>

          <p className="k-whisper mt-6 text-center">Backup pair +$29 at checkout</p>
        </div>

        {/* 2 Pairs */}
        <div className="bg-persimmon/5 border-persimmon/60 flex flex-col border p-8 shadow-[0_0_20px_var(--color-persimmon-25)]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="k-kicker text-persimmon">Recommended</p>
              <p className="font-body text-sumi mt-4 text-2xl font-light">2 Pairs</p>
              <p className="k-body mt-3 text-sm">One in work shoes. One in everything else.</p>
            </div>
            <div className="text-right">
              <p className="text-sumi font-mono text-3xl">$69</p>
              <p className="k-whisper mt-2">rotation</p>
            </div>
          </div>

          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">Best for multiple shoes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">Longer life through rotation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">90-day guarantee + free returns</span>
            </li>
          </ul>

          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="bg-sumi text-washi font-body hover:bg-persimmon mt-10 inline-flex h-14 w-full items-center justify-center text-sm tracking-widest uppercase transition-colors"
          >
            Get 2 Pairs
          </a>

          <p className="k-whisper mt-6 text-center">Backup pair +$29 at checkout</p>
        </div>
      </div>
    </OfferSection>
  )
}
