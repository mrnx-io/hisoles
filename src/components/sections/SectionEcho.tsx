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
    quote: "Hour 9 used to feel like glass. Now it’s just… a floor.",
    role: "Med Assistant",
    time: "9h",
    img: "/ugc/echo-4.jpg",
    mask: "/ugc/echo-4-mask.png",
  },
  {
    quote: "The relief is quiet. That’s what makes it real.",
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

export function SectionEcho() {
  return (
    <KakemonoSection
      id="echo"
      className="py-36"
      ornaments={
        <motion.div
          initial={{ scale: 2, opacity: 0, rotate: 10 }}
          whileInView={{ scale: 1, opacity: 0.82, rotate: -3 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          viewport={{ once: true, amount: 0.5 }}
          className="absolute bottom-10 right-10 z-30 mix-blend-multiply hidden md:block"
        >
          <div className="border-[3px] border-persimmon text-persimmon px-4 py-3 bg-washi/80">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest leading-tight text-center">
              12 Hours.
              <br />
              Held.
              <br />
              Or Free.
            </p>
          </div>
        </motion.div>
      }
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="k-title k-title-xl">Relief is ritual.</h2>
          <p className="k-body mt-6 text-sm max-w-md mx-auto">No stars. Just resonance.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {stories.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-washi border border-stone/10 shadow-sm mb-8 break-inside-avoid overflow-hidden"
            >
              <div className="relative aspect-[4/5] bg-stone/5">
                <PersimmonPhoto src={s.img} accentMaskSrc={s.mask} alt={`${s.role} relief moment`} />
              </div>

              <figcaption className="p-7">
                <p className="k-title k-title-md text-[18px] leading-tight">&ldquo;{s.quote}&rdquo;</p>
                <div className="mt-4 flex justify-between font-mono text-[9px] uppercase tracking-widest text-stone/60">
                  <span>{s.role}</span>
                  <span>{s.time}</span>
                </div>

                <div className="mt-6 h-px bg-stone/10 relative">
                  <span className="absolute -top-[3px] left-0 w-2 h-2 bg-persimmon rounded-full shadow-[0_0_10px_var(--color-persimmon-50)]" />
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </KakemonoSection>
  );
}
