"use client";

import { useOverlay } from "@/components/layout/OverlayProvider";

export function Footer() {
  const { openPanel } = useOverlay();

  return (
    <footer className="bg-washi text-stone py-20 px-6 md:px-12 relative z-20 overflow-hidden border-t border-stone/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 relative z-10">
        <div>
          <h4 className="font-display font-medium text-sumi text-2xl tracking-tight-logo mb-6 inline-block">
            h
            <span className="relative inline-block">
              ı
              <span className="absolute top-[0.2em] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-persimmon rounded-full" />
            </span>
            soles
          </h4>
          <p className="font-body text-sm max-w-xs leading-relaxed text-stone">
            Engineered calm for those who cannot stop.
            <br />
            <span className="text-stone/70">Relief is ritual.</span>
          </p>
        </div>
        <div className="flex gap-16 font-mono text-xs uppercase tracking-widest">
          <div className="flex flex-col gap-4">
            <span className="text-sumi">Support</span>
            <button type="button" onClick={() => openPanel("about")} className="text-left hover:text-persimmon transition-colors">
              About
            </button>
            <button type="button" onClick={() => openPanel("faq")} className="text-left hover:text-persimmon transition-colors">
              FAQ
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sumi">Company</span>
            <button type="button" onClick={() => openPanel("contact")} className="text-left hover:text-persimmon transition-colors">
              Contact
            </button>
            <button type="button" onClick={() => openPanel("legal")} className="text-left hover:text-persimmon transition-colors">
              Legal
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-stone/10 flex justify-between font-mono text-[10px] text-stone/60 uppercase tracking-widest">
        <span>&copy; 2025 Hisoles Inc.</span>
        <span>the art of standing</span>
      </div>
    </footer>
  );
}
