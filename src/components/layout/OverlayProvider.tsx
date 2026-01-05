"use client"

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react"

export type OverlayPanel = "about" | "faq" | "contact" | "legal" | null

interface OverlayContextValue {
  activePanel: OverlayPanel
  openPanel: (p: Exclude<OverlayPanel, null>) => void
  closePanel: () => void
}

const OverlayContext = createContext<OverlayContextValue | null>(null)

export function useOverlay() {
  const ctx = useContext(OverlayContext)
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider")
  return ctx
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<OverlayPanel>(null)

  useEffect(() => {
    if (!activePanel) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [activePanel])

  const value = useMemo(
    () => ({
      activePanel,
      openPanel: (p: Exclude<OverlayPanel, null>) => setActivePanel(p),
      closePanel: () => setActivePanel(null),
    }),
    [activePanel]
  )

  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
}
