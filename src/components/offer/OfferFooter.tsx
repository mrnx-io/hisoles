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
            Engineered calm for those who cannot stop.
          </p>
        </div>

        <nav className="flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          <a href="/" className="hover:text-persimmon transition-colors">
            Experience
          </a>
          <a href="#buy" className="hover:text-persimmon transition-colors">
            Pricing
          </a>
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="hover:text-persimmon transition-colors"
          >
            Checkout
          </a>
        </nav>
      </div>

      <div className="border-stone/10 text-stone/60 mx-auto mt-12 flex w-full max-w-6xl justify-between border-t pt-6 font-mono text-[10px] tracking-widest uppercase">
        <span>&copy; 2025 Hisoles Inc.</span>
        <span>the art of standing</span>
      </div>
    </footer>
  )
}
