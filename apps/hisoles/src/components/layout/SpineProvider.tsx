"use client"

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react"

// The narrative arc of the scroll (matches page flow order)
export type ChapterId = "void" | "tension" | "decay" | "artifact" | "echo" | "altar"

interface SpineContextValue {
  logoDotTopY: number
  setLogoDotTopY: (y: number) => void
  travelingDotSuppressed: boolean
  setTravelingDotSuppressed: (suppressed: boolean) => void
  positionReady: boolean
  // Narrative Tracking
  activeChapter: ChapterId
  setActiveChapter: (id: ChapterId) => void
}

const SpineContext = createContext<SpineContextValue | null>(null)

export function useSpine() {
  const context = useContext(SpineContext)
  if (!context) {
    throw new Error("useSpine must be used within a SpineProvider")
  }
  return context
}

export function SpineProvider({ children }: { children: ReactNode }) {
  const [logoDotTopY, setLogoDotTopYInternal] = useState(44)
  const [travelingDotSuppressed, setTravelingDotSuppressed] = useState(false)
  const [activeChapter, setActiveChapter] = useState<ChapterId>("void")
  const [positionReady, setPositionReady] = useState(false)

  const setLogoDotTopY = useCallback((y: number) => {
    setLogoDotTopYInternal(y)
    setPositionReady(true)
  }, [])

  const value = useMemo(
    () => ({
      logoDotTopY,
      setLogoDotTopY,
      travelingDotSuppressed,
      setTravelingDotSuppressed,
      positionReady,
      activeChapter,
      setActiveChapter,
    }),
    [logoDotTopY, travelingDotSuppressed, positionReady, activeChapter, setLogoDotTopY]
  )

  return <SpineContext.Provider value={value}>{children}</SpineContext.Provider>
}
