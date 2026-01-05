import { OfferSection } from "@/components/offer/OfferSection"

const FAQ = [
  {
    q: "Will it fit my shoes?",
    a: "Hisoles is designed to fit most everyday shoes. If space is tight, remove the original insole first.",
  },
  {
    q: "What if I’m between sizes?",
    a: "Choose the larger size. If you need help, we’ll guide you to the best fit and exchange if needed.",
  },
  {
    q: "How long does it take to get used to?",
    a: "Most people settle in within 1–3 shifts. Start with a few hours if you’re sensitive.",
  },
  {
    q: "Does it work for flat feet / high arches?",
    a: "Support needs are personal. Try it and see how your body responds — you’re covered by the guarantee.",
  },
  {
    q: "How do returns work?",
    a: "If it’s not for you, return it within 90 days. Free returns means you’re not stuck with the wrong choice.",
  },
  {
    q: "When does it ship?",
    a: "You’ll see shipping options at checkout. We keep it simple and fast.",
  },
] as const

export function OfferFAQ() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <p className="k-kicker">FAQ</p>
          <h2 className="k-title k-title-md mt-5">Quick answers.</h2>
        </header>

        <div className="divide-stone/10 border-stone/10 bg-washi mt-12 divide-y border">
          {FAQ.map((item) => (
            <details key={item.q} className="group">
              <summary className="font-body text-sumi flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-sm">
                <span>{item.q}</span>
                <span className="text-stone/60 font-mono text-xs transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="font-body text-stone text-sm leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>

        <p className="k-whisper mt-10 text-center">
          Still unsure? Start with 1 pair — you&apos;re covered.
        </p>
      </div>
    </OfferSection>
  )
}
