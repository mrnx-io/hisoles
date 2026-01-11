import Image from "next/image"
import { IMAGE_BLUR } from "@/components/offer/image-blur"
import { OfferSection } from "@/components/offer/OfferSection"
import { SizeChart } from "@/components/offer/SizeChart"
import { TrustRow } from "@/components/offer/TrustRow"

const PRICE_SINGLE = 39
const PRICE_ROTATION = 69
const ROTATION_PAIRS = 3
const PRICE_ROTATION_COMPARE = PRICE_SINGLE * ROTATION_PAIRS
const PRICE_ROTATION_SAVE = PRICE_ROTATION_COMPARE - PRICE_ROTATION
const PRICE_ROTATION_PER_PAIR = PRICE_ROTATION / ROTATION_PAIRS
const PRICE_PER_DAY = (PRICE_ROTATION / 365).toFixed(2)

// External price anchors (verifiable ranges)
const _PRICE_ANCHORS = {
  chiropractor: { low: 75, high: 150, label: "Single chiropractor visit" },
  podiatrist: { low: 200, high: 500, label: "Podiatrist consultation" },
  customOrthotics: { low: 300, high: 800, label: "Custom orthotics" },
} as const

export function OfferBundles() {
  return (
    <OfferSection id="buy" innerClassName="py-14 md:py-24">
      <header className="text-center">
        <p className="k-kicker">Choose your setup</p>
        <h2 className="k-title k-title-md mt-5">1 pair to try. 3 pairs to rotate.</h2>
        <p className="k-body mx-auto mt-5 max-w-md text-sm">
          Rotation keeps relief consistent across shoes — and helps each pair last longer.
        </p>
      </header>

      {/* Bundle cards - shown first on mobile for faster price visibility */}
      <div className="mt-10 grid gap-6 md:order-none md:mt-14 md:grid-cols-2">
        {/* 1 Pair */}
        <div className="bg-washi border-stone/15 order-2 flex flex-col border p-8 md:order-1">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="k-kicker">Start here</p>
              <p className="font-body text-sumi mt-4 text-2xl font-light">1 Pair</p>
              <p className="k-body mt-3 text-sm">
                Put it in your work shoes and test the &ldquo;hour 6&rdquo; moment.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sumi font-mono text-4xl leading-none">${PRICE_SINGLE}</p>
              <p className="k-whisper mt-2">${PRICE_SINGLE}.00 / pair</p>
            </div>
          </div>

          <div className="border-stone/10 bg-stone/5 relative mt-8 aspect-[16/11] w-full overflow-hidden border">
            <Image
              src="/product/hero.webp"
              alt="Hisoles insoles with structured support and a cushioned top layer"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR.hero}
            />
          </div>

          <p className="k-whisper mt-3 text-center">
            A simple test: how do your feet feel when you get home?
          </p>

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
              <span className="font-body text-stone">90-day guarantee + free returns</span>
            </li>
          </ul>

          <a
            data-checkout-link
            href="/checkout?add=trial"
            className="border-stone/20 text-sumi font-body hover:border-persimmon mt-10 inline-flex h-14 w-full items-center justify-center border bg-transparent text-sm tracking-widest uppercase transition-colors"
          >
            Try 1 Pair — ${PRICE_SINGLE}
          </a>

          <TrustRow className="mt-4" showSecure={false} variant="compact" />

          <p className="k-whisper mt-4 text-center">
            Prefer 3 pairs? Rotation is ${PRICE_ROTATION} (save ${PRICE_ROTATION_SAVE})
          </p>
        </div>

        {/* 3 Pairs */}
        <div className="bg-persimmon/5 border-persimmon/60 order-1 flex flex-col border p-8 shadow-[0_0_20px_var(--color-persimmon-25)] md:order-2">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="k-kicker text-persimmon">Most nurses &amp; workers choose this</p>
              <div className="mt-4 flex items-center gap-3">
                <p className="font-body text-sumi text-2xl font-light">3 Pairs</p>
                <span className="bg-persimmon/10 text-persimmon px-2 py-1 font-mono text-[10px] tracking-widest uppercase">
                  save ${PRICE_ROTATION_SAVE}
                </span>
              </div>
              <p className="k-body mt-3 text-sm">
                Work shoes. Everyday shoes. A backup that&apos;s always ready.
              </p>
            </div>
            <div className="text-right">
              <p className="text-stone/60 font-mono text-xs line-through">
                ${PRICE_ROTATION_COMPARE}
              </p>
              <p className="text-sumi font-mono text-4xl leading-none">${PRICE_ROTATION}</p>
              <p className="k-whisper mt-2">${PRICE_ROTATION_PER_PAIR.toFixed(2)} / pair</p>
            </div>
          </div>

          <div className="border-persimmon/30 bg-washi/60 relative mt-8 aspect-[16/11] w-full overflow-hidden border">
            <Image
              src="/product/bundles.webp"
              alt="Three packaged pairs of insoles for full rotation coverage"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR.bundles}
            />
          </div>

          <p className="k-whisper mt-3 text-center">
            Full rotation: work, casual, and a backup — covered.
          </p>

          {/* Value stack */}
          <div className="bg-washi/80 border-persimmon/20 mt-6 border p-4">
            <p className="k-whisper text-persimmon">What you get</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="font-body text-stone">3× Frame-First insoles</span>
                <span className="text-stone/60 font-mono text-xs line-through">
                  ${PRICE_ROTATION_COMPARE}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-body text-stone">90-day Shift Test guarantee</span>
                <span className="text-stone/60 font-mono text-xs">Included</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-body text-stone">Free returns &amp; exchanges</span>
                <span className="text-stone/60 font-mono text-xs">Included</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-body text-stone">Sizing support (human)</span>
                <span className="text-stone/60 font-mono text-xs">Included</span>
              </li>
            </ul>
            <div className="border-stone/10 mt-3 flex items-center justify-between border-t pt-3">
              <span className="font-body text-sumi font-medium">Your price</span>
              <span className="text-persimmon font-mono text-lg font-medium">
                ${PRICE_ROTATION}
              </span>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                No more &ldquo;forgot to swap&rdquo; — relief in every shoe
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">Alternating pairs = longer lifespan</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-persimmon mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="font-body text-stone">
                Less than ${PRICE_PER_DAY}/day for a year of support
              </span>
            </li>
          </ul>

          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="bg-sumi text-washi font-body hover:bg-persimmon mt-8 inline-flex h-14 w-full items-center justify-center text-sm tracking-widest uppercase transition-colors"
          >
            Get 3 Pairs — ${PRICE_ROTATION}
          </a>

          <TrustRow className="mt-4" showPaymentBadges />

          <p className="k-whisper mt-4 text-center">
            Try it for 90 days — return it if it’s not for you
          </p>
        </div>
      </div>

      {/* Supporting content - appears after prices on mobile for better flow */}
      <div className="mx-auto mt-10 flex max-w-3xl justify-center">
        <SizeChart />
      </div>

      <div className="border-stone/10 mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-3 border-t pt-6">
        <p className="k-whisper flex items-center gap-2">
          <span className="bg-stone/30 h-1.5 w-1.5 rounded-full" />
          90-day guarantee
        </p>
        <p className="k-whisper flex items-center gap-2">
          <span className="bg-stone/30 h-1.5 w-1.5 rounded-full" />
          Free returns
        </p>
        <p className="k-whisper flex items-center gap-2">
          <span className="bg-stone/30 h-1.5 w-1.5 rounded-full" />
          Shipping options at checkout
        </p>
      </div>
    </OfferSection>
  )
}
