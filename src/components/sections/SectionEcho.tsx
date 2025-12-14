"use client";

import { motion } from "motion/react";
import Image from "next/image";

const reviews = [
  {
    quote: "I sit in my car for 20 mins after every shift. Not today.",
    role: "ER Nurse",
    time: "12h",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote: "My Hokas were dead. These brought them back.",
    role: "Surgical Tech",
    time: "10h",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote: "If my feet go, I'm done. These hold me up.",
    role: "CNA",
    time: "14h",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
];

export function SectionEcho() {
  return (
    <section className="relative py-40 px-6 bg-washi z-10 border-t border-stone/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-body font-light text-4xl text-sumi leading-[0.95]">
            Relief is ritual.
          </h2>
        </div>

        {/* Masonry grid (per spec) */}
        <div className="columns-1 md:columns-3 gap-8 [column-fill:_balance]">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`mb-8 break-inside-avoid bg-stone/10 relative group overflow-hidden ${
                index === 0
                  ? "aspect-[4/5]"
                  : index === 1
                    ? "aspect-[3/5]"
                    : "aspect-[4/6]"
              }`}
            >
              {/* Stylized Image — high contrast B&W */}
              <Image
                src={review.image}
                alt={`${review.role} testimonial`}
                fill
                className="object-cover grayscale brightness-75 contrast-150 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Stronger overlay to abstract stock feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/70 to-sumi/30" />

              {/* PERSIMMON INSOLE ACCENT - The ONLY color in B&W photos (per spec) */}
              {/* "The only color in these photos is the Persimmon accent of the insole (peeking out of a shoe or sitting on a bench)" */}
              <div className="absolute bottom-24 right-6 w-8 h-16 opacity-90">
                <div className="relative w-full h-full">
                  {/* Stylized insole shape peeking out */}
                  <div className="absolute inset-0 bg-persimmon rounded-[40%] rotate-12 shadow-lg shadow-persimmon/30" />
                  {/* Honeycomb texture hint */}
                  <div className="absolute inset-1 opacity-30">
                    <svg viewBox="0 0 20 34" className="w-full h-full text-washi">
                      <pattern id={`honeycomb-${index}`} x="0" y="0" width="10" height="17" patternUnits="userSpaceOnUse">
                        <path d="M5 0 L10 4.25 L10 12.75 L5 17 L0 12.75 L0 4.25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#honeycomb-${index})`} />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text Overlay — more prominent */}
              <div className="absolute bottom-0 left-0 p-8 w-full text-washi">
                <p className="font-body text-lg leading-snug mb-4">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-80">
                  <span>{review.role}</span>
                  <span>{review.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Digital Hanko (bottom-right, per spec) */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 mix-blend-multiply">
        <div className="border-2 border-persimmon text-persimmon px-5 py-4 rotate-3 opacity-85 bg-washi/40 backdrop-blur-[1px]">
          <p className="font-mono text-[10px] uppercase tracking-wide-cta leading-tight">
            12 HOURS.
            <br />
            HELD.
          </p>
        </div>
      </div>
    </section>
  );
}
