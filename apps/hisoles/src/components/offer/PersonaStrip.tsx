import { cn } from "@/lib/utils"

interface PersonaStripProps {
  className?: string
}

const PERSONAS = [
  {
    label: "Healthcare",
    roles: "Nurses · CNAs · Med Assistants",
    pain: "12h on tile floors",
  },
  {
    label: "Warehouse",
    roles: "Pickers · Packers · Logistics",
    pain: "Concrete all day",
  },
  {
    label: "Construction",
    roles: "Framers · Ironworkers · Trades",
    pain: "Steel-toes on hard surfaces",
  },
  {
    label: "Hospitality",
    roles: "Servers · Bartenders · Hotel Staff",
    pain: "Doubles on restaurant floors",
  },
  {
    label: "Retail",
    roles: "Cashiers · Floor Staff · Managers",
    pain: "Standing + walking all shift",
  },
] as const

export function PersonaStrip({ className }: PersonaStripProps) {
  return (
    <div className={cn("border-stone/10 bg-washi/80 border backdrop-blur", className)}>
      <div className="border-stone/10 border-b px-6 py-4">
        <p className="k-kicker text-center">Built for people who stand all day</p>
      </div>

      <div className="bg-stone/10 grid grid-cols-2 gap-px sm:grid-cols-3 md:grid-cols-5">
        {PERSONAS.map((p) => (
          <div key={p.label} className="bg-washi px-4 py-4 text-center">
            <p className="font-body text-sumi text-sm font-medium">{p.label}</p>
            <p className="text-stone/60 mt-1 font-mono text-[9px] leading-tight tracking-widest uppercase">
              {p.roles}
            </p>
            <p className="text-stone/50 mt-2 text-[10px] italic">{p.pain}</p>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 text-center">
        <p className="k-whisper">
          If you&apos;re on your feet 8+ hours on hard floors — this was built for you.
        </p>
      </div>
    </div>
  )
}
