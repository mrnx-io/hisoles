"use client"

import { useOverlay } from "@/components/layout/OverlayProvider"

export function Footer() {
  const { openPanel } = useOverlay()

  return (
    <footer className="text-stone border-stone/10 bg-washi relative z-20 overflow-hidden border-t px-6 py-20 md:px-12">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
        <div>
          <h4 className="font-display text-sumi tracking-tight-logo mb-6 inline-block text-2xl font-medium">
            h
            <span className="relative inline-block">
              ı
              <span className="bg-persimmon absolute top-[0.2em] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full" />
            </span>
            soles
          </h4>
          <p className="font-body text-stone max-w-xs text-sm leading-relaxed">
            Engineered calm for those who cannot stop.
            <br />
            <span className="text-stone/70">Relief is ritual.</span>
          </p>
        </div>
        <div className="flex gap-16 font-mono text-xs tracking-widest uppercase">
          <div className="flex flex-col gap-4">
            <span className="text-sumi">Support</span>
            <button
              type="button"
              onClick={() => openPanel("about")}
              className="hover:text-persimmon text-left transition-colors"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => openPanel("faq")}
              className="hover:text-persimmon text-left transition-colors"
            >
              FAQ
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sumi">Company</span>
            <button
              type="button"
              onClick={() => openPanel("contact")}
              className="hover:text-persimmon text-left transition-colors"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => openPanel("legal")}
              className="hover:text-persimmon text-left transition-colors"
            >
              Legal
            </button>
          </div>
        </div>
      </div>
      <div className="border-stone/10 text-stone/60 mx-auto mt-24 flex max-w-7xl justify-between border-t pt-8 font-mono text-[10px] tracking-widest uppercase">
        <span>&copy; 2025 Hisoles Inc.</span>
        <span>the art of standing</span>
      </div>
    </footer>
  )
}
