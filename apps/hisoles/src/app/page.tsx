import { ChapterRail } from "@/components/layout/ChapterRail"
import { CheckoutDrawer } from "@/components/layout/CheckoutDrawer"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { MeridianSystem } from "@/components/layout/MeridianSystem"
import { OverlayProvider } from "@/components/layout/OverlayProvider"
import { ShojiDrawer } from "@/components/layout/ShojiDrawer"
import { SpineProvider } from "@/components/layout/SpineProvider"
import { SectionAltar } from "@/components/sections/SectionAltar"
import { SectionArtifact } from "@/components/sections/SectionArtifact"
import { SectionDecay } from "@/components/sections/SectionDecay"
import { SectionEcho } from "@/components/sections/SectionEcho"
import { SectionTension } from "@/components/sections/SectionTension"
import { SectionVoid } from "@/components/sections/SectionVoid"

export default function Home() {
  return (
    <OverlayProvider>
      <SpineProvider>
        <div className="relative min-h-[100svh] w-full">
          {/* Structure */}
          <MeridianSystem />
          <Header />
          <ChapterRail />

          {/* Kakemono flow (best-first rhythm) */}
          <main id="main">
            <SectionVoid />
            <SectionTension />
            <SectionDecay />
            <SectionArtifact />
            <SectionEcho />
            <SectionAltar />
          </main>

          <Footer />

          <CheckoutDrawer />
          <ShojiDrawer />
        </div>
      </SpineProvider>
    </OverlayProvider>
  )
}
