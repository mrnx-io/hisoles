"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// The narrative arc of the scroll (matches page flow order)
export type ChapterId = "void" | "tension" | "decay" | "artifact" | "echo" | "altar";

interface SpineContextValue {
  logoDotTopY: number;
  logoDotBottomY: number;
  setLogoDotTopY: (y: number) => void;
  setLogoDotBottomY: (y: number) => void;
  travelingDotSuppressed: boolean;
  setTravelingDotSuppressed: (suppressed: boolean) => void;
  // Narrative Tracking
  activeChapter: ChapterId;
  setActiveChapter: (id: ChapterId) => void;
}

const SpineContext = createContext<SpineContextValue | null>(null);

export function useSpine() {
  const context = useContext(SpineContext);
  if (!context) {
    throw new Error("useSpine must be used within a SpineProvider");
  }
  return context;
}

export function SpineProvider({ children }: { children: ReactNode }) {
  const [logoDotTopY, setLogoDotTopY] = useState(44);
  const [logoDotBottomY, setLogoDotBottomY] = useState(50);
  const [travelingDotSuppressed, setTravelingDotSuppressed] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("void");

  const value = useMemo(
    () => ({
      logoDotTopY,
      logoDotBottomY,
      setLogoDotTopY,
      setLogoDotBottomY,
      travelingDotSuppressed,
      setTravelingDotSuppressed,
      activeChapter,
      setActiveChapter,
    }),
    [logoDotTopY, logoDotBottomY, travelingDotSuppressed, activeChapter]
  );

  return <SpineContext.Provider value={value}>{children}</SpineContext.Provider>;
}
