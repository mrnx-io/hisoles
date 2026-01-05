"use client"

import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useId, useRef } from "react"
import { useOverlay } from "@/components/layout/OverlayProvider"
import { useDialogAccessibility } from "@/lib/useDialogAccessibility"

const PANEL_COPY = {
  about: {
    title: "About",
    body: (
      <div className="space-y-6">
        <p className="k-body text-sm">
          hisoles is engineered calm — a layer of alignment between you and the floor.
        </p>
        <p className="k-body text-sm">
          This storefront is a sanctuary: fewer words, more proof, and a single spine through the
          chaos.
        </p>
        <div className="border-stone/10 border-t pt-4">
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
          <p className="k-body mt-2 text-sm">
            Choose your usual size range. If between sizes, size up.
          </p>
        </div>
        <div>
          <p className="font-body text-sumi">Care</p>
          <p className="k-body mt-2 text-sm">Air dry. Avoid high heat. Let the material breathe.</p>
        </div>
        <div>
          <p className="font-body text-sumi">Guarantee</p>
          <p className="k-body mt-2 text-sm">
            If you don&apos;t feel held through your shift, we make it right.
          </p>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Contact",
    body: (
      <div className="space-y-4">
        <p className="k-body text-sm">Email is best. We respond like humans.</p>
        <p className="text-sumi font-mono text-[12px]">support@hisoles.com</p>
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
} as const

export function ShojiDrawer() {
  const { activePanel, closePanel } = useOverlay()
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const { dialogRef } = useDialogAccessibility({
    isOpen: !!activePanel,
    onClose: closePanel,
    initialFocusRef: closeBtnRef,
  })

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
            className="bg-sumi/50 fixed inset-0 z-[80] backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.dialog
            ref={dialogRef}
            open
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }} // SPRING_DRAWER preset
            className="bg-washi border-stone/10 fixed top-0 right-0 bottom-0 z-[90] m-0 w-[92vw] max-w-md border-l shadow-2xl outline-none"
            tabIndex={-1}
          >
            {/* Paper edge - decorative */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[10px] bg-[linear-gradient(to_right,rgba(26,26,26,0.10),transparent)] opacity-40"
              aria-hidden="true"
            />

            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-stone/10 flex items-center justify-between border-b p-6">
                <h2 id={titleId} className="font-body text-sumi text-xl font-medium">
                  {PANEL_COPY[activePanel].title}
                </h2>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closePanel}
                  className="text-stone hover:text-persimmon transition-colors"
                  aria-label={`Close ${PANEL_COPY[activePanel].title} panel`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6">{PANEL_COPY[activePanel].body}</div>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  )
}
