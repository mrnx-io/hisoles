export function OfferHeader() {
  return (
    <header className="bg-washi/80 border-stone/10 sticky top-0 z-[60] border-b backdrop-blur">
      <a
        href="#main"
        className="bg-washi border-stone/20 tracking-wide-cta text-sumi sr-only border px-4 py-3 font-mono text-[10px] uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9990]"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-12">
        <a
          href="/"
          className="font-display tracking-tight-logo text-sumi inline-flex items-center text-xl font-medium"
          aria-label="hisoles"
        >
          h
          <span className="relative inline-block">
            ı
            <span className="bg-persimmon absolute top-[0.22em] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full" />
          </span>
          soles
        </a>

        <div className="flex items-center gap-4">
          <span className="k-whisper hidden sm:inline">90-day guarantee · free returns</span>
          <a
            data-checkout-link
            href="/checkout?add=rotation"
            className="bg-sumi text-washi font-body hover:bg-persimmon inline-flex h-12 items-center justify-center px-5 text-xs tracking-widest uppercase transition-colors"
          >
            Get 2 Pairs — $69
          </a>
        </div>
      </div>
    </header>
  )
}
