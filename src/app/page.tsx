import { CartProvider } from "@/components/layout/CartProvider";
import { MeridianSystem } from "@/components/layout/MeridianSystem";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpineProvider } from "@/components/layout/SpineProvider";
import { CheckoutDrawer } from "@/components/layout/CheckoutDrawer";
import { ChapterRail } from "@/components/layout/ChapterRail";
import { SectionVoid } from "@/components/sections/SectionVoid";
import { SectionTension } from "@/components/sections/SectionTension";
import { SectionDecay } from "@/components/sections/SectionDecay";
import { SectionArtifact } from "@/components/sections/SectionArtifact";
import { SectionEcho } from "@/components/sections/SectionEcho";
import { SectionAltar } from "@/components/sections/SectionAltar";
import { OverlayProvider } from "@/components/layout/OverlayProvider";
import { ShojiDrawer } from "@/components/layout/ShojiDrawer";

export default function Home() {
  return (
    <OverlayProvider>
      <CartProvider>
        <SpineProvider>
          <div className="relative w-full min-h-[100svh]">
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
      </CartProvider>
    </OverlayProvider>
  );
}
