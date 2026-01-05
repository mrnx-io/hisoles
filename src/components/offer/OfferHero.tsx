"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { IMAGE_BLUR } from "@/components/offer/image-blur"
import { OfferSection } from "@/components/offer/OfferSection"
import { PersonaStrip } from "@/components/offer/PersonaStrip"
import { ProofStrip } from "@/components/offer/ProofStrip"
import { TrustRow } from "@/components/offer/TrustRow"

export function OfferHero() {
  return (
    <OfferSection id="main" className="border-t-0" innerClassName="pt-6 pb-14 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
        <div>
          {/* MOBILE-FIRST: Hero Visual Block - appears FIRST to stop the scroll from FB ads */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.65, 0, 1] }}
            className="relative mb-8 block md:hidden"
          >
            <div className="bg-stone/5 border-stone/10 relative mx-auto aspect-[4/3] w-full overflow-hidden border shadow-[0_20px_70px_rgba(26,26,26,0.12)]">
              <Image
                src="/product/hero.webp"
                alt="Hisoles insoles with structured support and a cushioned top layer"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-[50%_65%]"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR.hero}
              />
              {/* Gradient overlay for badge readability */}
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,26,0.04)_0%,transparent_30%,transparent_70%,rgba(26,26,26,0.12)_100%)]"
                aria-hidden="true"
              />
              {/* Hour 10 outcome badge - reinforces the promise visually */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute right-3 bottom-3 z-10"
              >
                <div className="bg-washi/95 border-stone/10 flex items-center gap-2 border px-3 py-2 shadow-lg backdrop-blur-sm">
                  <span className="bg-persimmon h-2 w-2 animate-pulse rounded-full" />
                  <span className="font-mono text-[10px] font-medium tracking-wider uppercase">
                    Hour 10 — still standing
                  </span>
                </div>
              </motion.div>
            </div>
            {/* Social proof micro-line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="k-whisper mx-auto mt-3 text-center"
            >
              Shift-tested by 2,500+ healthcare &amp; warehouse workers
            </motion.p>
          </motion.div>

          {/* Kicker: Direct offer hook for FB traffic */}
          <p className="k-kicker text-persimmon">Try it risk-free for 90 days</p>

          {/* Headline: Pain-first, outcome-second */}
          <h1 className="k-title k-title-xl mt-6">
            Test these on your next shift. If hour 6 doesn&apos;t feel different — full refund.
          </h1>

          {/* Subhead: The no-brainer pitch */}
          <p className="k-body mt-6 max-w-md text-sm md:text-base">
            <strong className="text-sumi">$39 to test what $300+ custom orthotics promise.</strong>{" "}
            Structured support that holds its shape when foam flattens — and you keep them only if
            they work.
          </p>

          {/* Risk reversal callout - the foot-in-the-door */}
          <div className="border-persimmon/30 bg-persimmon/5 mt-6 max-w-md border-l-2 py-3 pr-4 pl-4">
            <p className="font-body text-sumi text-sm font-medium">
              The deal: You either love them by day 90, or you get every dollar back.
            </p>
            <p className="font-body text-stone mt-1 text-sm">
              No questions. No hoops. We pay return shipping.
            </p>
          </div>

          {/* What you get - value stack */}
          <ul className="mt-8 space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                <strong className="text-sumi">Frame-First support</strong> that doesn&apos;t flatten
                by lunch
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                <strong className="text-sumi">90-day test</strong> — keep them only if they work
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                <strong className="text-sumi">Free exchanges</strong> if the size isn&apos;t right
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                <strong className="text-sumi">Human support</strong> — real people, not chatbots
              </span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              data-checkout-link
              href="/checkout?add=trial"
              className="bg-sumi text-washi font-body hover:bg-persimmon active:bg-persimmon focus-visible:ring-persimmon focus-visible:ring-offset-washi inline-flex h-14 w-full items-center justify-center px-8 text-sm tracking-widest uppercase shadow-[0_18px_50px_rgba(26,26,26,0.14)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            >
              Test 1 Pair — $39
            </a>
            <a
              data-checkout-link
              href="/checkout?add=rotation"
              className="border-stone/20 text-sumi font-body hover:border-persimmon active:border-persimmon active:bg-stone/5 focus-visible:ring-persimmon focus-visible:ring-offset-washi inline-flex h-14 w-full items-center justify-center border bg-transparent px-8 text-sm tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            >
              Or Get 3 Pairs — $69
            </a>
          </div>

          <TrustRow className="mt-6 justify-start" showRating />

          <p className="k-whisper mt-3">
            $39 = less than one chiropractor visit to find out if this works for you
          </p>
        </div>

        <div className="relative">
          <div className="bg-stone/5 border-stone/10 relative mx-auto hidden aspect-square w-full max-w-lg overflow-hidden border shadow-[0_20px_70px_rgba(26,26,26,0.12)] md:block">
            <Image
              src="/product/hero.webp"
              alt="Hisoles insoles with structured support and a cushioned top layer"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 0px, (max-width: 1024px) 45vw, 512px"
              className="object-cover object-[50%_72%]"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR.hero}
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

      {/* Persona targeting strip - hidden on mobile to reduce scroll length */}
      <PersonaStrip className="mx-auto mt-16 hidden max-w-4xl md:block" />
    </OfferSection>
  )
}
