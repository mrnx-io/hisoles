import { BadgeCheck } from "lucide-react"
import Image from "next/image"
import { OfferSection } from "@/components/offer/OfferSection"
import { ReviewStats } from "@/components/offer/ReviewStats"

// Photo-backed testimonials (anchor stories)
const PHOTO_STORIES = [
  {
    quote:
      "I work 10-hour hospital shifts on tile. With other insoles, the cushion was toast by hour 6. These still feel supportive at hour 10 — and I'm not limping around my kitchen after work.",
    name: "Nina R.",
    role: "ER Nurse",
    location: "Phoenix, AZ",
    shift: "10h shifts",
    usage: "2 weeks in",
    img: "/product/proof-1.webp",
    alt: "Nurse holding Hisoles insoles after hospital shift",
    caption: "The shift ends. You still have enough in your feet to live.",
  },
  {
    quote:
      "12-hour days in steel-toe boots on concrete. By lunch my heels used to feel tender. After a week with these, the last few hours feel manageable — and the insoles don't feel crushed flat.",
    name: "Mike D.",
    role: "Concrete/Framing",
    location: "Denver, CO",
    shift: "12h shifts",
    usage: "7 shifts in",
    img: "/product/proof-2.webp",
    alt: "Construction worker with Hisoles on job site",
    caption: "Hard floors don't soften. Your support shouldn't either.",
  },
] as const

// Text-only shift logs (volume + specificity)
const SHIFT_LOGS = [
  {
    quote:
      "I'm on a warehouse floor all day (9-10 hours). The biggest change is stability — I feel steadier pushing carts, and my feet don't feel wrecked when I get home.",
    name: "Jasmine L.",
    role: "Warehouse Associate",
    location: "Columbus, OH",
    shift: "9h shifts",
    usage: "10 shifts in",
  },
  {
    quote:
      "Steel-toe boots on rebar all day — these fit inside and don't add bulk. My heels don't feel bruised when I peel them off anymore.",
    name: "Tony R.",
    role: "Ironworker",
    location: "Newark, NJ",
    shift: "10h shifts",
    usage: "2 weeks in",
  },
  {
    quote:
      "I do doubles on hard restaurant floors. The 'hot spot' under my heel was the first thing to calm down. It's not squishy — just… steady.",
    name: "Carlos M.",
    role: "Server",
    location: "Austin, TX",
    shift: "11h shifts",
    usage: "2 weeks in",
  },
  {
    quote:
      "I bartend 6 nights a week — standing behind the bar, not walking. My calves used to burn by closing. These made the last 2 hours tolerable.",
    name: "Derek W.",
    role: "Bartender",
    location: "Chicago, IL",
    shift: "10h shifts",
    usage: "3 weeks in",
  },
  {
    quote:
      "Two pairs was the move: one lives in my work shoes, one in my sneakers. I stop forgetting them — and my feet feel more consistent week to week.",
    name: "Tanya K.",
    role: "Retail",
    location: "Seattle, WA",
    shift: "9h shifts",
    usage: "1 month in",
  },
  {
    quote:
      "First 2 shifts felt different (in a good way) — more support. By shift 4 it just felt normal… which is the point.",
    name: "Sam P.",
    role: "CNA",
    location: "Tampa, FL",
    shift: "12h shifts",
    usage: "4 shifts in",
  },
  {
    quote:
      "Concrete used to feel like it was coming straight through my shoes by the end. Now it's just… a floor.",
    name: "Alex G.",
    role: "Med Assistant",
    location: "San Jose, CA",
    shift: "9h shifts",
    usage: "2 weeks in",
  },
] as const

export function OfferProof() {
  return (
    <OfferSection innerClassName="py-20 md:py-24">
      <header className="text-center">
        <p className="k-kicker">Shift notes</p>
        <h2 className="k-title k-title-md mt-5">What changes by hour 10.</h2>
        <p className="k-body mx-auto mt-5 max-w-md text-sm">
          Real shifts. Real floors. Small notes that add up.
        </p>
        <ReviewStats className="mt-6" />
      </header>

      {/* Photo-backed anchor stories */}
      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {PHOTO_STORIES.map((s) => (
          <figure
            key={s.img}
            className="bg-washi border-stone/10 overflow-hidden border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="bg-stone/5 relative aspect-[4/5]">
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(26,26,26,0.38)_100%)]" />
            </div>

            <figcaption className="px-6 py-6">
              <div className="flex items-center justify-between">
                <p className="k-whisper">{s.caption}</p>
                <span className="text-persimmon/70 flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase">
                  <BadgeCheck className="h-3 w-3" />
                  Verified
                </span>
              </div>
              <blockquote className="font-body text-sumi mt-4 text-base leading-snug">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="mt-5 space-y-1">
                <div className="text-stone/70 font-mono text-[10px] tracking-widest uppercase">
                  {s.name} · {s.role} · {s.location}
                </div>
                <div className="text-stone/50 font-mono text-[10px] tracking-widest uppercase">
                  {s.shift} · {s.usage}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Text-only shift logs for volume */}
      <div className="mx-auto mt-10 max-w-3xl">
        <p className="k-whisper mb-6 text-center">More from the field</p>
        <div className="grid gap-4 md:grid-cols-2">
          {SHIFT_LOGS.map((s) => (
            <div
              key={s.name}
              className="border-stone/10 bg-washi border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <blockquote className="font-body text-sumi text-sm leading-relaxed">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="text-stone/70 font-mono text-[10px] tracking-widest uppercase">
                    {s.name} · {s.role} · {s.location}
                  </div>
                  <div className="text-stone/50 font-mono text-[10px] tracking-widest uppercase">
                    {s.shift} · {s.usage}
                  </div>
                </div>
                <span className="text-persimmon/60 flex shrink-0 items-center gap-1 font-mono text-[9px] tracking-widest uppercase">
                  <BadgeCheck className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OfferSection>
  )
}
