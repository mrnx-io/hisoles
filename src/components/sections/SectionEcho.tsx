"use client";

import { motion } from "motion/react";
import { KakemonoSection } from "@/components/layout/KakemonoSection";
import { PersimmonPhoto } from "@/components/media/PersimmonPhoto";

const stories = [
  {
    quote: "I sit in my car for 20 mins after every shift. Not today.",
    role: "ER Nurse",
    time: "12h",
    img: "/ugc/echo-1.jpg",
    mask: "/ugc/echo-1-mask.png",
  },
  {
    quote: "My Hokas were dead. These brought them back.",
    role: "Surgical Tech",
    time: "10h",
    img: "/ugc/echo-2.jpg",
    mask: "/ugc/echo-2-mask.png",
  },
  {
    quote: "If my feet go, I'm done. These hold me up.",
    role: "CNA",
    time: "14h",
    img: "/ugc/echo-3.jpg",
    mask: "/ugc/echo-3-mask.png",
  },
  {
    quote: "Hour 9 used to feel like glass. Now it's just… a floor.",
    role: "Med Assistant",
    time: "9h",
    img: "/ugc/echo-4.jpg",
    mask: "/ugc/echo-4-mask.png",
  },
  {
    quote: "The relief is quiet. That's what makes it real.",
    role: "ICU Nurse",
    time: "12h",
    img: "/ugc/echo-5.jpg",
    mask: "/ugc/echo-5-mask.png",
  },
  {
    quote: "I stopped dreading the last four hours.",
    role: "ER Tech",
    time: "12h",
    img: "/ugc/echo-6.jpg",
    mask: "/ugc/echo-6-mask.png",
  },
];

// Unified timing (match design system)
const DURATION_ATTENTION = 0.6;
const DELAY_MA = 0.08;
const EASE_EMERGE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SectionEcho() {
  return (
    <KakemonoSection id="echo" className="py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-20 text-center">
          <h2 className="k-title k-title-xl">Relief is ritual.</h2>
          <p className="k-body mt-5 text-sm max-w-md mx-auto">No stars. Just resonance.</p>
        </header>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stories.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION_ATTENTION,
                delay: i * DELAY_MA,
                ease: EASE_EMERGE,
              }}
              viewport={{ once: true, margin: "-48px" }}
              className="group bg-washi border border-stone/8 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] bg-stone/5">
                <PersimmonPhoto src={s.img} accentMaskSrc={s.mask} alt={`${s.role} relief moment`} />
              </div>

              {/* Content */}
              <figcaption className="px-6 py-6">
                {/* Quote */}
                <blockquote className="font-body text-base leading-snug text-sumi">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>

                {/* Metadata row */}
                <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-stone/50">
                  <span>{s.role}</span>
                  <span className="tabular-nums">{s.time}</span>
                </div>

                {/* Accent line with dot */}
                <div className="mt-5 relative">
                  <div className="h-px bg-stone/8" />
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 bg-persimmon rounded-full shadow-[0_0_8px_var(--color-persimmon-25)]" />
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </KakemonoSection>
  );
}
