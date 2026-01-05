"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const SIZES = [
  { size: "S", mens: "5-7", womens: "6-8" },
  { size: "M", mens: "8-10.5", womens: "9-11.5" },
  { size: "L", mens: "11-13", womens: "12-14" },
  { size: "XL", mens: "13.5-15", womens: "14.5+" },
] as const

interface SizeChartProps {
  className?: string
}

export function SizeChart({ className }: SizeChartProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-stone/15 hover:border-stone/30 hover:bg-stone/5 text-stone/70 hover:text-stone flex min-h-[44px] items-center gap-2 rounded-sm border px-4 py-2 font-mono text-[11px] tracking-wider uppercase transition-colors"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
        Size guide
      </button>

      {isOpen && (
        <div className="border-stone/10 bg-washi mt-3 border p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="k-whisper">Hisoles sizing</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-stone/50 hover:text-sumi -mr-2 flex h-11 w-11 items-center justify-center transition-colors"
              aria-label="Close size guide"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-stone/10 border-b">
                <th className="text-stone/60 pb-2 font-mono text-[10px] tracking-widest uppercase">
                  Size
                </th>
                <th className="text-stone/60 pb-2 font-mono text-[10px] tracking-widest uppercase">
                  Men&apos;s
                </th>
                <th className="text-stone/60 pb-2 font-mono text-[10px] tracking-widest uppercase">
                  Women&apos;s
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((row) => (
                <tr key={row.size} className="border-stone/5 border-b last:border-0">
                  <td className="text-sumi py-2 font-mono text-sm font-medium">{row.size}</td>
                  <td className="font-body text-stone py-2 text-sm">{row.mens}</td>
                  <td className="font-body text-stone py-2 text-sm">{row.womens}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-stone/60 mt-3 text-xs leading-relaxed">
            <strong className="text-stone">Between sizes?</strong> Size up. Exchanges are free if
            needed.
          </p>
        </div>
      )}
    </div>
  )
}
