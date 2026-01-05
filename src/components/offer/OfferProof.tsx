import Image from "next/image"
import { OfferSection } from "@/components/offer/OfferSection"

const STORIES = [
  {
    quote: "I sit in my car for 20 mins after every shift. Not today.",
    role: "ER Nurse",
    time: "12h",
    img: "/ugc/echo-1.jpg",
  },
  {
    quote: "My Hokas were dead. These brought them back.",
    role: "Surgical Tech",
    time: "10h",
    img: "/ugc/echo-2.jpg",
  },
  {
    quote: "If my feet go, I'm done. These hold me up.",
    role: "CNA",
    time: "14h",
    img: "/ugc/echo-3.jpg",
  },
  {
    quote: "Hour 9 used to feel like glass. Now it's just… a floor.",
    role: "Med Assistant",
    time: "9h",
    img: "/ugc/echo-4.jpg",
  },
  {
    quote: "The relief is quiet. That's what makes it real.",
    role: "ICU Nurse",
    time: "12h",
    img: "/ugc/echo-5.jpg",
  },
  {
    quote: "I stopped dreading the last four hours.",
    role: "ER Tech",
    time: "12h",
    img: "/ugc/echo-6.jpg",
  },
] as const

export function OfferProof() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <header className="text-center">
        <p className="k-kicker">Field notes</p>
        <h2 className="k-title k-title-md mt-5">Relief is ritual.</h2>
        <p className="k-body mx-auto mt-5 max-w-md text-sm">
          No hype. Just what people notice on real shifts.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s) => (
          <figure
            key={s.img}
            className="bg-washi border-stone/10 overflow-hidden border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="bg-stone/5 relative aspect-[4/5]">
              <Image
                src={s.img}
                alt={`${s.role} relief moment`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(26,26,26,0.38)_100%)]" />
            </div>

            <figcaption className="px-6 py-6">
              <blockquote className="font-body text-sumi text-base leading-snug">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="text-stone/50 mt-5 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
                <span>{s.role}</span>
                <span className="tabular-nums">{s.time}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </OfferSection>
  )
}
