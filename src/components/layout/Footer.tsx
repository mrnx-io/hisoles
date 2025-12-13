"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-sumi text-stone py-20 px-6 md:px-12 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 relative z-10">
        <div>
          <h4 className="font-display text-washi text-2xl tracking-tight mb-6">
            hisoles
          </h4>
          <p className="font-body text-sm max-w-xs leading-relaxed text-stone/70">
            Bio-architectural design for the 12-hour shift. <br />
            Engineered in Japan. Worn everywhere.
          </p>
        </div>
        <div className="flex gap-16 font-mono text-xs uppercase tracking-widest">
          <div className="flex flex-col gap-4">
            <span className="text-washi">Assistance</span>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Sizing Guide
            </Link>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Shipping
            </Link>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Returns
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-washi">Company</span>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Philosophy
            </Link>
            <Link
              href="#"
              className="hover:text-persimmon transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-washi/5 flex justify-between font-mono text-[10px] text-stone/40 uppercase tracking-widest">
        <span>&copy; 2025 Hisoles Inc.</span>
        <span>Relief is Ritual</span>
      </div>
    </footer>
  );
}
