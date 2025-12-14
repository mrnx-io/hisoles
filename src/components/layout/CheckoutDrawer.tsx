"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useCart } from "@/components/layout/CartProvider";

export function CheckoutDrawer() {
  const { items, isOpen, closeCart, totalPrice, addItem } = useCart();

  const handleAddBackup = () => {
    addItem({
      id: "backup-pair",
      name: "Backup Pair",
      price: 29,
    });
  };

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
            className="fixed inset-0 bg-sumi/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] md:max-h-[70vh] md:left-1/2 md:-translate-x-1/2 md:max-w-lg bg-washi z-[70] shadow-2xl flex flex-col rounded-t-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone/10 flex justify-between items-center bg-washi">
              <h3 className="font-body font-medium text-xl text-sumi">Your Shift</h3>
              <button
                onClick={closeCart}
                className="hover:text-persimmon transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-body text-stone">Your cart is empty</p>
                  <p className="font-mono text-xs text-stone/60 mt-2">
                    Add some relief to get started
                  </p>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between mb-6 pb-6 border-b border-stone/10"
                    >
                      <div>
                        <p className="font-body font-medium text-lg">
                          {item.name}
                        </p>
                        <p className="font-mono text-xs text-stone mt-1">
                          Size: M (8-10.5)
                        </p>
                        {item.quantity > 1 && (
                          <p className="font-mono text-xs text-stone mt-1">
                            Qty: {item.quantity}
                          </p>
                        )}
                      </div>
                      <p className="font-mono text-lg">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  ))}

                  {/* CHECKOUT BUMP */}
                  <div className="bg-stone/5 p-5 rounded border border-stone/10">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-body font-medium text-sm text-sumi mb-1">
                          Add a backup pair?
                        </p>
                        <p className="font-body text-xs text-stone leading-tight">
                          Swap between shoes. Get 6 months of relief.
                        </p>
                      </div>
                      <button
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

            {/* Footer */}
            <div className="p-6 bg-washi border-t border-stone/10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-sm text-stone">Subtotal</span>
                <span className="font-mono text-xl text-sumi">
                  ${totalPrice}
                </span>
              </div>
              <button
                className="w-full h-14 bg-sumi text-washi font-body uppercase tracking-widest hover:bg-persimmon transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={items.length === 0}
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
