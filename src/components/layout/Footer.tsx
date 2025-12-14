"use client";

import Link from "next/link";

export function Footer() {
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
            Bio-architectural design for the 12-hour shift. <br />
            Engineered in Japan. Worn everywhere.
          </p>
        </div>
        <div className="flex gap-16 font-mono text-xs uppercase tracking-widest">
          {/* Column 1: About — FAQ */}
          <div className="flex flex-col gap-4">
            <span className="text-sumi">Support</span>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              FAQ
            </Link>
          </div>
          {/* Column 2: Contact — Legal */}
          <div className="flex flex-col gap-4">
            <span className="text-sumi">Company</span>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Legal
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-stone/10 flex justify-between font-mono text-[10px] text-stone/60 uppercase tracking-widest">
        <span>&copy; 2025 Hisoles Inc.</span>
        <span>Relief is Ritual</span>
      </div>
    </footer>
  );
}
