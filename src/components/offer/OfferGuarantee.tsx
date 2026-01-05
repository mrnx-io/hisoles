import { OfferSection } from "@/components/offer/OfferSection"

export function OfferGuarantee() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="k-kicker">The 90-Day Shift Test</p>
        <h2 className="k-title k-title-md mt-5">
          Wear them on real shifts for 90 days. Decide with your feet.
        </h2>
        <p className="k-body mt-6 text-sm md:text-base">
          If they don&apos;t earn their place in your shoes, send them back. Returns are free — and
          you&apos;ll be taken care of by a human, not a chatbot.
        </p>

        <div className="border-stone/10 bg-washi mt-12 border p-8 text-left">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="k-kicker">1</p>
              <p className="font-body text-sumi mt-3 text-sm font-medium">Wear it</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Give them 1–3 shifts to settle in. Use them at work, on concrete, all day.
                That&apos;s the only real test.
              </p>
            </div>
            <div>
              <p className="k-kicker">2</p>
              <p className="font-body text-sumi mt-3 text-sm font-medium">Decide</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Keep them if they help. Exchange sizes if needed — it&apos;s free and fast. No
                hoops, no hassle.
              </p>
            </div>
            <div>
              <p className="k-kicker">3</p>
              <p className="font-body text-sumi mt-3 text-sm font-medium">Return (if needed)</p>
              <p className="font-body text-stone mt-2 text-sm leading-relaxed">
                Email{" "}
                <a
                  href="mailto:support@hisoles.com"
                  className="text-sumi underline hover:no-underline"
                >
                  support@hisoles.com
                </a>
                . We reply within 24 hours with a prepaid label. Drop it off and your refund
                processes in days.
              </p>
            </div>
          </div>
        </div>

        {/* Risk reversal callout */}
        <div className="border-persimmon/20 bg-persimmon/5 mt-8 border p-6">
          <p className="font-body text-sumi text-sm font-medium">
            Why we offer this: We&apos;d rather refund you than have you stuck with something that
            doesn&apos;t help.
          </p>
          <p className="font-body text-stone mt-2 text-sm leading-relaxed">
            If it doesn&apos;t work for you, that&apos;s not a failure — it&apos;s just the wrong
            fit. No guilt, no questions. We mean it.
          </p>
        </div>

        <p className="k-whisper mt-8">90 days from delivery. Full refund. No questions asked.</p>
      </div>
    </OfferSection>
  )
}
