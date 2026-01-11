import { BadgeCheck, Star } from "lucide-react"
import Image from "next/image"
import { IMAGE_BLUR } from "@/components/offer/image-blur"
import { OfferSection } from "@/components/offer/OfferSection"
import { ReviewStats } from "@/components/offer/ReviewStats"

const STAR_POSITIONS = [0, 1, 2, 3, 4] as const

// Inline star rating component for testimonials
function StarRating({ size = "sm" }: { size?: "sm" | "xs" }) {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-3 w-3"
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={`testimonial-star-${pos}`}
          className={`fill-persimmon text-persimmon ${sizeClass}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

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
    blur: IMAGE_BLUR.proof1,
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
    blur: IMAGE_BLUR.proof2,
    alt: "Construction worker with Hisoles on job site",
    caption: "Hard floors don't soften. Your support shouldn't either.",
  },
]

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
    avatar: "/product/proof-1.webp",
    blur: IMAGE_BLUR.proof1,
  },
  {
    quote:
      "Steel-toe boots on rebar all day — these fit inside and don't add bulk. My heels don't feel bruised when I peel them off anymore.",
    name: "Tony R.",
    role: "Ironworker",
    location: "Newark, NJ",
    shift: "10h shifts",
    usage: "2 weeks in",
    avatar: "/product/proof-2.webp",
    blur: IMAGE_BLUR.proof2,
  },
  {
    quote:
      "I do doubles on hard restaurant floors. The 'hot spot' under my heel was the first thing to calm down. It's not squishy — just… steady.",
    name: "Carlos M.",
    role: "Server",
    location: "Austin, TX",
    shift: "11h shifts",
    usage: "2 weeks in",
    avatar: "/product/proof-3.png",
    blur: IMAGE_BLUR.proof3,
  },
  {
    quote:
      "I bartend 6 nights a week — standing behind the bar, not walking. My calves used to burn by closing. These made the last 2 hours tolerable.",
    name: "Derek W.",
    role: "Bartender",
    location: "Chicago, IL",
    shift: "10h shifts",
    usage: "3 weeks in",
    avatar: "/product/proof-4.png",
    blur: IMAGE_BLUR.proof4,
  },
  {
    quote:
      "Two pairs was the move: one lives in my work shoes, one in my sneakers. I stop forgetting them — and my feet feel more consistent week to week.",
    name: "Tanya K.",
    role: "Retail",
    location: "Seattle, WA",
    shift: "9h shifts",
    usage: "1 month in",
    avatar: "/product/proof-1.webp",
    blur: IMAGE_BLUR.proof1,
  },
  {
    quote:
      "First 2 shifts felt different (in a good way) — more support. By shift 4 it just felt normal… which is the point.",
    name: "Sam P.",
    role: "CNA",
    location: "Tampa, FL",
    shift: "12h shifts",
    usage: "4 shifts in",
    avatar: "/product/proof-2.webp",
    blur: IMAGE_BLUR.proof2,
  },
  {
    quote:
      "Concrete used to feel like it was coming straight through my shoes by the end. Now it's just… a floor.",
    name: "Alex G.",
    role: "Med Assistant",
    location: "San Jose, CA",
    shift: "9h shifts",
    usage: "2 weeks in",
    avatar: "/product/proof-3.png",
    blur: IMAGE_BLUR.proof3,
  },
] as const

export function OfferProof() {
  return (
    <OfferSection softBorder innerClassName="py-14 md:py-24">
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
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 92vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={s.blur}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(26,26,26,0.38)_100%)]" />
            </div>

            <figcaption className="px-6 py-6">
              {/* Star rating + verified badge row - most scannable element */}
              <div className="flex items-center justify-between">
                <StarRating size="sm" />
                <span className="bg-persimmon/10 text-persimmon flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <blockquote className="font-body text-sumi mt-4 text-base leading-snug">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="mt-5 space-y-1.5">
                <div className="text-sumi font-mono text-[11px] font-medium tracking-wider uppercase">
                  {s.name} · {s.role}
                </div>
                <div className="text-stone/60 font-mono text-[10px] tracking-widest uppercase">
                  {s.location} · {s.shift} · {s.usage}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Text-only shift logs for volume - show 4 on mobile, all on desktop */}
      <div className="mx-auto mt-10 max-w-3xl">
        <p className="k-whisper mb-6 text-center">More from the field</p>
        <div className="grid gap-4 md:grid-cols-2">
          {SHIFT_LOGS.map((s, index) => (
            <div
              key={s.name}
              className={`border-stone/10 bg-washi border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${index >= 4 ? "hidden md:block" : ""}`}
            >
              {/* Header: Avatar + name/role + star rating */}
              <div className="mb-3 flex items-center gap-3">
                {/* Avatar image */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={s.avatar}
                    alt={s.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={s.blur}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sumi truncate font-mono text-[11px] font-medium tracking-wider uppercase">
                      {s.name}
                    </span>
                    <StarRating size="xs" />
                  </div>
                  <div className="text-stone/60 truncate font-mono text-[10px] tracking-widest uppercase">
                    {s.role} · {s.shift}
                  </div>
                </div>
              </div>
              <blockquote className="font-body text-sumi text-sm leading-relaxed">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-stone/50 font-mono text-[10px] tracking-widest uppercase">
                  {s.location} · {s.usage}
                </span>
                <span className="bg-persimmon/10 text-persimmon flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                  <BadgeCheck className="h-3 w-3" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OfferSection>
  )
}
