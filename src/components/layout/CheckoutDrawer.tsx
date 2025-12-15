"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/layout/CartProvider";
import { useRouter } from "next/navigation";

export function CheckoutDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const handleAddBackup = () => {
    addItem({ id: "backup-pair", name: "Backup Pair", price: 29 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-sumi/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] md:max-h-[70vh] md:left-1/2 md:-translate-x-1/2 md:max-w-lg bg-washi z-[70] shadow-2xl flex flex-col rounded-t-2xl border border-stone/10"
          >
            <div className="p-6 border-b border-stone/10 flex justify-between items-center bg-washi">
              <h3 className="font-body font-medium text-xl text-sumi">Your Shift</h3>
              <button type="button" onClick={closeCart} className="hover:text-persimmon transition-colors" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-stone">Your cart is empty</p>
                  <p className="font-mono text-xs text-stone/60 mt-2">Add some relief to get started</p>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={item.id} className="mb-6 pb-6 border-b border-stone/10">
                      <div className="flex justify-between items-start gap-6">
                        <div>
                          <p className="font-body font-medium text-lg">{item.name}</p>
                          <p className="font-mono text-xs text-stone mt-1">Size: M (8–10.5)</p>
                        </div>
                        <p className="font-mono text-lg">${item.price * item.quantity}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 border border-stone/15 grid place-items-center hover:border-stone/30 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-mono text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 border border-stone/15 grid place-items-center hover:border-stone/30 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide-cta text-stone/60 hover:text-persimmon transition-colors"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="bg-stone/5 p-5 rounded border border-stone/10">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-body font-medium text-sm text-sumi mb-1">
                          Add a backup pair?
                        </p>
                        <p className="font-body text-xs text-stone leading-tight">
                          Swap between shoes. Keep the ritual consistent.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddBackup}
                        className="whitespace-nowrap bg-washi border border-persimmon text-persimmon text-[10px] font-bold px-3 py-2 uppercase hover:bg-persimmon hover:text-washi transition-colors shadow-sm"
                      >
                        + Add $29
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 bg-washi border-t border-stone/10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-sm text-stone">Subtotal</span>
                <span className="font-mono text-xl text-sumi">${totalPrice}</span>
              </div>

              <div className="mb-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-stone/60">
                <span>90-day guarantee</span>
                <span>Free returns</span>
              </div>

              <button
                type="button"
                className="w-full h-14 bg-sumi text-washi font-body uppercase tracking-widest hover:bg-persimmon transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={items.length === 0}
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
