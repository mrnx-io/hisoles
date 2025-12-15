"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useOverlay } from "@/components/layout/OverlayProvider";

const PANEL_COPY = {
  about: {
    title: "About",
    body: (
      <div className="space-y-6">
        <p className="k-body text-sm">
          hisoles is engineered calm — a layer of alignment between you and the floor.
        </p>
        <p className="k-body text-sm">
          This storefront is a sanctuary: fewer words, more proof, and a single spine through the chaos.
        </p>
        <div className="pt-4 border-t border-stone/10">
          <p className="k-whisper">Relief is ritual.</p>
        </div>
      </div>
    ),
  },
  faq: {
    title: "FAQ",
    body: (
      <div className="space-y-7">
        <div>
          <p className="font-body text-sumi">Sizing</p>
          <p className="k-body text-sm mt-2">Choose your usual size range. If between sizes, size up.</p>
        </div>
        <div>
          <p className="font-body text-sumi">Care</p>
          <p className="k-body text-sm mt-2">Air dry. Avoid high heat. Let the material breathe.</p>
        </div>
        <div>
          <p className="font-body text-sumi">Guarantee</p>
          <p className="k-body text-sm mt-2">If you don&apos;t feel held through your shift, we make it right.</p>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Contact",
    body: (
      <div className="space-y-4">
        <p className="k-body text-sm">Email is best. We respond like humans.</p>
        <p className="font-mono text-[12px] text-sumi">support@hisoles.com</p>
      </div>
    ),
  },
  legal: {
    title: "Legal",
    body: (
      <div className="space-y-4">
        <p className="k-body text-sm">Privacy & terms live here. Keep it readable.</p>
      </div>
    ),
  },
} as const;

export function ShojiDrawer() {
  const { activePanel, closePanel } = useOverlay();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activePanel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };

    window.addEventListener("keydown", onKeyDown);
    closeBtnRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePanel, closePanel]);

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
            className="fixed inset-0 bg-sumi/50 backdrop-blur-sm z-[80]"
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={PANEL_COPY[activePanel].title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-[92vw] max-w-md bg-washi z-[90] border-l border-stone/10 shadow-2xl"
          >
            {/* Paper edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-[linear-gradient(to_right,rgba(26,26,26,0.10),transparent)] opacity-40" />

            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-stone/10 flex items-center justify-between">
                <p className="font-body font-medium text-xl text-sumi">
                  {PANEL_COPY[activePanel].title}
                </p>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closePanel}
                  className="text-stone hover:text-persimmon transition-colors"
                  aria-label="Close panel"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">{PANEL_COPY[activePanel].body}</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

