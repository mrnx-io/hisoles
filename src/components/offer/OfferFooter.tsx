import { Mail, MapPin } from "lucide-react"

export function OfferFooter() {
  return (
    <footer className="text-stone border-stone/10 bg-washi relative z-20 overflow-hidden border-t px-6 py-16 md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <p className="font-display tracking-tight-logo text-sumi text-2xl font-medium">
            h
            <span className="relative inline-block">
              ı
              <span className="bg-persimmon absolute top-[0.22em] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full" />
            </span>
            soles
          </p>
          <p className="font-body text-stone mt-3 text-sm">
            Engineered calm for the people who can&apos;t sit down at work.
          </p>

          {/* Company presence signals */}
          <div className="text-stone/60 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Austin, TX
            </span>
            <a
              href="mailto:support@hisoles.com"
              className="hover:text-persimmon flex min-h-11 items-center gap-1.5 transition-colors"
            >
              <Mail className="h-3 w-3" />
              support@hisoles.com
            </a>
          </div>
        </div>

        <nav className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
          <a
            href="/"
            className="hover:text-persimmon flex min-h-11 items-center px-3 transition-colors"
          >
            Experience
          </a>
          <a
            href="#buy"
            className="hover:text-persimmon flex min-h-11 items-center px-3 transition-colors"
          >
            Pricing
          </a>
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="hover:text-persimmon flex min-h-11 items-center px-3 transition-colors"
          >
            Checkout
          </a>
        </nav>
      </div>

      {/* Trust footer strip */}
      <div className="border-stone/10 mx-auto mt-10 flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t pt-6 text-center font-mono text-[10px] tracking-widest uppercase">
        <span className="text-stone/50">90-day money-back guarantee</span>
        <span className="text-stone/30 hidden sm:inline">·</span>
        <span className="text-stone/50">Free returns</span>
        <span className="text-stone/30 hidden sm:inline">·</span>
        <span className="text-stone/50">Real humans, not chatbots</span>
      </div>

      <div className="text-stone/60 mx-auto mt-6 flex w-full max-w-6xl justify-between font-mono text-[10px] tracking-widest uppercase">
        <span>&copy; 2025 Hisoles Inc.</span>
        <span>the art of standing</span>
      </div>
    </footer>
  )
}
