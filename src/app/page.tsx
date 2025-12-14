import { CartProvider } from "@/components/layout/CartProvider";
import { WashiGrain } from "@/components/layout/WashiGrain";
import { MeridianLine } from "@/components/layout/MeridianLine";
import { TravelingDot } from "@/components/layout/TravelingDot";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpineProvider } from "@/components/layout/SpineProvider";
import { CheckoutDrawer } from "@/components/layout/CheckoutDrawer";
import { SectionVoid } from "@/components/sections/SectionVoid";
import { SectionTension } from "@/components/sections/SectionTension";
import { SectionArtifact } from "@/components/sections/SectionArtifact";
import { SectionEcho } from "@/components/sections/SectionEcho";
import { SectionAltar } from "@/components/sections/SectionAltar";
import { SectionDecay } from "@/components/sections/SectionDecay";

export default function Home() {
  return (
    <CartProvider>
      <SpineProvider>
        <div className="relative w-full min-h-screen">
          {/* The Texture */}
          <WashiGrain />

          {/* Structure */}
          <MeridianLine />
          <TravelingDot />
          <Header />

          {/* Flow */}
          <main>
            <SectionVoid />
            <SectionArtifact />
            <SectionTension />
            <SectionDecay />
            <SectionEcho />
            <SectionAltar />
          </main>

          <Footer />
          <CheckoutDrawer />
        </div>
      </SpineProvider>
    </CartProvider>
  );
}
