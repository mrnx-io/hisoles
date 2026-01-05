import Image from "next/image"
import { OfferSection } from "@/components/offer/OfferSection"
import { PersonaStrip } from "@/components/offer/PersonaStrip"
import { ProofStrip } from "@/components/offer/ProofStrip"
import { TrustRow } from "@/components/offer/TrustRow"

export function OfferHero() {
  return (
    <OfferSection id="main" className="border-t-0" innerClassName="py-20 md:py-28">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div>
          {/* Kicker: Mechanism tease instead of pure qualification */}
          <p className="k-kicker">Why foam insoles fail by lunch</p>

          {/* Headline: Pain-first, outcome-second */}
          <h1 className="k-title k-title-xl mt-6">
            Still standing at hour 10 — without your feet screaming at you.
          </h1>

          {/* Mobile-only Hero Image (Above Fold) */}
          <div className="relative mt-8 block md:hidden">
            <div className="bg-stone/5 border-stone/10 relative mx-auto aspect-square w-full max-w-sm overflow-hidden border shadow-[0_20px_70px_rgba(26,26,26,0.12)]">
              <Image
                src="/product/hero.webp"
                alt="Hisoles insoles with structured support and a cushioned top layer"
                fill
                priority
                sizes="92vw"
                className="object-cover object-[50%_72%]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(252,250,245,0.92)_0%,rgba(252,250,245,0)_52%)]"
                aria-hidden="true"
              />
            </div>
            <p className="k-whisper mx-auto mt-3 w-full text-center">
              Built for hard floors — designed to feel steady, not squishy.
            </p>
          </div>

          {/* Subhead: VoC echo + mechanism contrast */}
          <p className="k-body mt-6 max-w-md text-sm md:text-base">
            If you&apos;ve ever said &ldquo;my feet are killing me by hour 6&rdquo; — this is built
            for you. Structured support that holds its shape when foam flattens.
          </p>

          {/* Social proof line - audience identification */}
          <p className="font-body text-stone mt-5 max-w-md text-sm leading-relaxed">
            Built for nurses, warehouse workers, servers, and anyone who knows what &ldquo;barely
            walking when I get home&rdquo; feels like.
          </p>

          {/* Outcome-focused bullets */}
          <ul className="mt-8 space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                Still stable at hour 10 — even on concrete and tile
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                No more &ldquo;hot spot&rdquo; heel pain by mid-shift
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                Fits your work shoes — exchanges are free if not
              </span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              data-checkout-link
              href="/checkout?add=rotation"
              className="bg-sumi text-washi font-body hover:bg-persimmon active:bg-persimmon focus-visible:ring-persimmon focus-visible:ring-offset-washi inline-flex h-14 w-full items-center justify-center px-8 text-sm tracking-widest uppercase shadow-[0_18px_50px_rgba(26,26,26,0.14)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            >
              Get 2 Pairs — $69
            </a>
            <a
              data-checkout-link
              href="/checkout?add=trial"
              className="border-stone/20 text-sumi font-body hover:border-persimmon active:border-persimmon active:bg-stone/5 focus-visible:ring-persimmon focus-visible:ring-offset-washi inline-flex h-14 w-full items-center justify-center border bg-transparent px-8 text-sm tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            >
              Try 1 Pair — $39
            </a>
          </div>

          <TrustRow className="mt-6 justify-start" showRating />

          <p className="k-whisper mt-3">
            Questions?{" "}
            <a href="mailto:support@hisoles.com" className="underline hover:no-underline">
              support@hisoles.com
            </a>{" "}
            · Most choose 2 pairs
          </p>
        </div>

        <div className="relative">
          <div className="bg-stone/5 border-stone/10 relative mx-auto hidden aspect-square w-full max-w-lg overflow-hidden border shadow-[0_20px_70px_rgba(26,26,26,0.12)] md:block">
            <Image
              src="/product/hero.webp"
              alt="Hisoles insoles with structured support and a cushioned top layer"
              fill
              priority
              sizes="50vw"
              className="object-cover object-[50%_72%]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(252,250,245,0.92)_0%,rgba(252,250,245,0)_52%)]"
              aria-hidden="true"
            />
          </div>

          <p className="k-whisper mx-auto mt-3 w-[min(92vw,420px)] text-center">
            Built for hard floors — designed to feel steady, not squishy.
          </p>

          <ProofStrip className="mt-6 w-[min(92vw,420px)]" />

          <div className="border-stone/10 bg-washi/80 mx-auto mt-4 w-[min(92vw,420px)] border px-6 py-5 backdrop-blur">
            <p className="k-whisper">Most people rotate</p>
            <p className="font-body text-sumi mt-2 text-sm leading-snug">
              One pair takes the beating at work. One pair keeps relief consistent everywhere else.
            </p>
          </div>
        </div>
      </div>

      {/* Persona targeting strip */}
      <PersonaStrip className="mx-auto mt-16 max-w-4xl" />
    </OfferSection>
  )
}
