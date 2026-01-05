import { OfferSection } from "@/components/offer/OfferSection"

const FAQ = [
  // OBJECTION: "Will it fit my shoes?"
  {
    q: "Will it fit my work shoes? (Steel-toe boots, clogs, sneakers, etc.)",
    a: "Hisoles fits most everyday work shoes — sneakers, clogs, loafers, and even most steel-toe boots with removable insoles. Remove the factory insole first for the best fit. If it doesn't work, exchanges are free.",
  },
  // OBJECTION: "I've tried insoles before and they didn't work"
  {
    q: `"I've tried insoles before — they all flatten out." What's different?`,
    a: "Most insoles are foam-only, and foam compresses flat under load. Hisoles uses a structural frame that resists compression, a heel cup for stability, then adds cushion on top. The support comes from structure — not soft material that quits by lunch.",
  },
  // OBJECTION: "Is it worth the money?"
  {
    q: "Is $39 (or $69 for 2 pairs) actually worth it?",
    a: "If it lasts you 6 months of shifts, that's less than $0.25 per workday. Compare that to a daily coffee. And if it doesn't work out — you get a full refund. There's no risk to find out if it helps.",
  },
  // OBJECTION: "What if it doesn't work for me?"
  {
    q: "What if it doesn't work for me?",
    a: "Then you return it — free shipping, full refund, no questions. You have 90 days to test it on real shifts. Email support@hisoles.com and a real person will take care of you within 24 hours. We'd rather refund than have you stuck with something that doesn't help.",
  },
  // OBJECTION: "How long until I feel relief?"
  {
    q: "How long until I feel a difference?",
    a: "Most people notice a difference in the last hours of their first shift — that's when support matters most. Give it 1–3 shifts to fully settle in. If you're sensitive to changes, start with a few hours and build up.",
  },
  // OBJECTION: "Do I need to see a doctor instead?"
  {
    q: "Should I see a doctor instead?",
    a: "If you have sharp pain, numbness, swelling that doesn't go away, or a diagnosed condition — yes, see a professional. Hisoles helps with general fatigue and discomfort from standing on hard floors all day. It's not a medical device. For everyday standing soreness? It's worth trying with our guarantee.",
  },
  // Supporting questions
  {
    q: `"My feet are killing me by hour 6" — will these help?`,
    a: "That's exactly who we built this for. Hisoles is structured support + quiet cushion for long standing on hard floors. Give it 1–3 shifts. If it doesn't help, you're covered by the 90-day guarantee.",
  },
  {
    q: "What if I'm between sizes?",
    a: "Choose the larger size — you can always trim it. If you get it wrong, exchanges are free and fast.",
  },
  {
    q: "Does it work for flat feet / high arches?",
    a: "Support needs are personal, and we can't promise it fits every foot type. But with a 90-day guarantee and free returns, you can test it with your feet — not just our claims.",
  },
  {
    q: "How do returns work?",
    a: "Email support@hisoles.com. We'll reply within 24 hours with a prepaid return label. Drop it off, and your refund processes within a few days. No forms, no hassle, no guilt.",
  },
  {
    q: "When does it ship?",
    a: "Orders ship within 1–2 business days. You'll get tracking via email. Most US deliveries arrive in 3–5 days.",
  },
] as const

export function OfferFAQ() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <p className="k-kicker">FAQ</p>
          <h2 className="k-title k-title-md mt-5">Will this work for me?</h2>
        </header>

        <div className="divide-stone/10 border-stone/10 bg-washi mt-12 divide-y border">
          {FAQ.map((item) => (
            <details key={item.q} className="group">
              <summary className="font-body text-sumi flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm md:gap-6 md:px-6 md:py-5">
                <span className="leading-snug">{item.q}</span>
                <span className="bg-stone/5 text-stone/60 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 md:px-6 md:pb-6">
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
