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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-body font-light text-4xl text-sumi leading-[0.95]">
            Relief is ritual.
          </h2>
          <div className="hidden md:block border-2 border-persimmon text-persimmon px-4 py-2 rounded-lg -rotate-3 mix-blend-multiply opacity-80">
            <span className="font-mono text-xs font-bold">12 HOURS. HELD.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="aspect-[4/5] bg-stone/10 relative group overflow-hidden"
            >
              {/* Stylized Image — high contrast, abstracted */}
              <Image
                src={review.image}
                alt={`${review.role} testimonial`}
                fill
                className="object-cover grayscale brightness-75 contrast-150 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Stronger overlay to abstract stock feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/70 to-sumi/30" />
              {/* Persimmon Overlay on Hover */}
              <div className="absolute inset-0 bg-persimmon/30 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

        {/* Mobile Stamp */}
        <div className="md:hidden mt-16 flex justify-center">
          <div className="w-32 h-32 border-4 border-persimmon rounded-full flex flex-col items-center justify-center text-persimmon opacity-90 mix-blend-multiply -rotate-6">
            <span className="font-body font-bold text-2xl">12HR</span>
            <span className="font-body font-bold text-2xl">HELD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
