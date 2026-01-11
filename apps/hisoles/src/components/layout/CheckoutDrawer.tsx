"use client"

import { Minus, Plus, Trash2, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useId, useRef } from "react"
import { useDialogAccessibility } from "@/lib/useDialogAccessibility"
import { selectTotalPrice, useCartStore } from "@/stores/cart-store"

export function CheckoutDrawer() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const totalPrice = useCartStore(selectTotalPrice)
  const addItem = useCartStore((s) => s.addItem)

  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  const { dialogRef } = useDialogAccessibility({
    isOpen,
    onClose: closeCart,
    initialFocusRef: closeBtnRef,
  })

  const handleAddBackup = () => {
    addItem({ id: "backup-pair", name: "Backup Pair", price: 29 })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="bg-sumi/60 fixed inset-0 z-[60] backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.dialog
            ref={dialogRef}
            open
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }} // SPRING_DRAWER preset
            className="bg-washi border-stone/10 fixed right-0 bottom-0 left-0 z-[70] m-0 flex max-h-[85vh] flex-col rounded-t-2xl border shadow-2xl outline-none md:left-1/2 md:max-h-[70vh] md:max-w-lg md:-translate-x-1/2"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="border-stone/10 flex items-center justify-between border-b p-6">
              <h2 id={titleId} className="font-body text-sumi text-xl font-medium">
                Your Shift
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeCart}
                className="hover:text-persimmon transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-body text-stone">Your cart is empty</p>
                  <p className="text-stone/60 mt-2 font-mono text-xs">
                    Add some relief to get started
                  </p>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.id} className="border-stone/10 mb-6 border-b pb-6">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="font-body text-lg font-medium">{item.name}</p>
                          <p className="text-stone mt-1 font-mono text-xs">Size: M (8–10.5)</p>
                        </div>
                        <p className="font-mono text-lg">${item.price * item.quantity}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <fieldset className="flex items-center gap-2 border-none p-0">
                          <legend className="sr-only">Quantity controls for {item.name}</legend>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-stone/15 hover:border-stone/30 grid h-9 w-9 place-items-center border transition-colors"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-mono text-sm" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-stone/15 hover:border-stone/30 grid h-9 w-9 place-items-center border transition-colors"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={16} />
                          </button>
                        </fieldset>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="tracking-wide-cta text-stone/60 hover:text-persimmon flex items-center gap-2 font-mono text-[10px] uppercase transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={14} aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Upsell */}
                  <div className="bg-stone/5 border-stone/10 rounded border p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-body text-sumi mb-1 text-sm font-medium">
                          Add a backup pair?
                        </p>
                        <p className="font-body text-stone text-xs leading-tight">
                          Swap between shoes. Keep the ritual consistent.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddBackup}
                        className="bg-washi border-persimmon text-persimmon hover:bg-persimmon hover:text-washi border px-3 py-2 text-[10px] font-bold whitespace-nowrap uppercase shadow-sm transition-colors"
                      >
                        + Add $29
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-stone/10 border-t p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-stone font-mono text-sm">Subtotal</span>
                <span className="text-sumi font-mono text-xl" aria-live="polite">
                  ${totalPrice}
                </span>
              </div>

              <div className="text-stone/60 mb-4 flex justify-between font-mono text-[10px] tracking-widest uppercase">
                <span>90-day guarantee</span>
                <span>Free returns</span>
              </div>

              <button
                type="button"
                className="bg-sumi text-washi font-body hover:bg-persimmon h-14 w-full tracking-widest uppercase shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                disabled={items.length === 0}
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  )
}
