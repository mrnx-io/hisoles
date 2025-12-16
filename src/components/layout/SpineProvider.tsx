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
  logoDotCenterX: number;
  headerBottomY: number;
  setLogoDotTopY: (y: number) => void;
  setLogoDotBottomY: (y: number) => void;
  setLogoDotCenterX: (x: number) => void;
  setHeaderBottomY: (y: number) => void;
  travelingDotSuppressed: boolean;
  setTravelingDotSuppressed: (suppressed: boolean) => void;
  positionReady: boolean;
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
  const [logoDotTopY, setLogoDotTopYInternal] = useState(44);
  const [logoDotBottomY, setLogoDotBottomY] = useState(50);
  const [logoDotCenterX, setLogoDotCenterX] = useState(0);
  const [headerBottomY, setHeaderBottomY] = useState(80);
  const [travelingDotSuppressed, setTravelingDotSuppressed] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ChapterId>("void");
  const [positionReady, setPositionReady] = useState(false);

  const setLogoDotTopY = (y: number) => {
    setLogoDotTopYInternal(y);
    if (!positionReady) setPositionReady(true);
  };

  const value = useMemo(
    () => ({
      logoDotTopY,
      logoDotBottomY,
      logoDotCenterX,
      headerBottomY,
      setLogoDotTopY,
      setLogoDotBottomY,
      setLogoDotCenterX,
      setHeaderBottomY,
      travelingDotSuppressed,
      setTravelingDotSuppressed,
      positionReady,
      activeChapter,
      setActiveChapter,
    }),
    [logoDotTopY, logoDotBottomY, logoDotCenterX, headerBottomY, travelingDotSuppressed, positionReady, activeChapter]
  );

  return <SpineContext.Provider value={value}>{children}</SpineContext.Provider>;
}
