"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const offers = [
  {
    id: "trial",
    name: "The Trial",
    price: 39,
    originalPrice: null,
    description: "1 Pair. Standard relief.",
    badges: [],
    expertTip:
      ">> Expert Tip: Rotate pairs to extend life by 40%.",
  },
  {
    id: "rotation",
    name: "The Rotation",
    price: 69,
    originalPrice: 78,
    description: "2 Pairs. Always have a dry pair.",
    badges: ["Save $9", "Free Shipping"],
    recommended: true,
  },
];

export function SectionAltar() {
  const [selectedId, setSelectedId] = useState("rotation");
  const { addItem } = useCart();

  const handleCheckout = () => {
    const selected = offers.find((o) => o.id === selectedId);
    if (selected) {
      addItem({
        id: selected.id,
        name: `${selected.id === "trial" ? "1" : "2"} Pair${selected.id === "rotation" ? "s" : ""} - ${selected.name}`,
        price: selected.price,
      });
    }
  };

  return (
    <motion.section
      id="altar"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative min-h-screen pt-40 pb-32 px-6 flex flex-col items-center justify-center bg-gradient-to-b from-washi via-washi to-washi/95"
    >
      <div className="max-w-xl w-full relative z-20">
        <div className="text-center mb-20">
          <span className="font-mono text-xs text-persimmon uppercase tracking-widest mb-4 block">
            The Artifact
          </span>
          <h2 className="font-body font-light text-5xl md:text-6xl text-sumi leading-[0.95]">
            Start the Shift.
          </h2>
        </div>

        <div className="grid gap-6 mb-12">
          {offers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => setSelectedId(offer.id)}
              className={`cursor-pointer border-2 p-6 transition-all duration-300 relative ${
                selectedId === offer.id
                  ? offer.recommended
                    ? "border-persimmon bg-washi shadow-xl scale-[1.02]"
                    : "border-sumi bg-washi shadow-lg"
                  : "border-stone/10 bg-washi hover:border-stone/30"
              }`}
              role="button"
              tabIndex={0}
              aria-pressed={selectedId === offer.id}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedId(offer.id);
                }
              }}
            >
              {offer.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-persimmon text-washi px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                  Recommended
                </div>
              )}

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-body font-medium text-xl text-sumi">{offer.name}</h3>
                <div className="flex flex-col items-end">
                  <span
                    className={`font-mono text-lg ${
                      offer.recommended
                        ? "text-persimmon font-bold"
                        : "text-sumi"
                    }`}
                  >
                    ${offer.price}
                  </span>
                  {offer.originalPrice && (
                    <span className="font-mono text-xs text-stone line-through decoration-persimmon">
                      ${offer.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="font-body text-sm text-stone mb-4">
                {offer.description}
              </p>

              {offer.badges.length > 0 && (
                <div className="flex gap-2">
                  {offer.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-1 bg-stone/5 text-stone text-[10px] font-mono uppercase rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {selectedId === offer.id && offer.expertTip && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 bg-persimmon/5 p-3 rounded border border-persimmon/20">
                      <p className="font-mono text-[10px] text-persimmon uppercase tracking-widest">
                        {offer.expertTip}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          className="w-full h-16 bg-sumi text-washi flex items-center justify-center gap-4 font-body text-lg uppercase tracking-widest hover:bg-persimmon transition-colors duration-500 group"
        >
          Secure Checkout
          <ArrowRight
            size={22}
            className="group-hover:translate-x-2 transition-transform duration-300"
          />
        </button>

        <p className="text-center mt-6 font-mono text-[10px] text-stone/50 uppercase tracking-widest">
          90-Day Money Back Guarantee
        </p>
      </div>
    </motion.section>
  );
}
