import type { Metadata } from "next"
import Script from "next/script"
import { OfferBundles } from "@/components/offer/OfferBundles"
import { OfferFAQ } from "@/components/offer/OfferFAQ"
import { OfferFinalCTA } from "@/components/offer/OfferFinalCTA"
import { OfferFooter } from "@/components/offer/OfferFooter"
import { OfferGuarantee } from "@/components/offer/OfferGuarantee"
import { OfferHeader } from "@/components/offer/OfferHeader"
import { OfferHero } from "@/components/offer/OfferHero"
import { OfferMechanism } from "@/components/offer/OfferMechanism"
import { OfferProof } from "@/components/offer/OfferProof"

export const metadata: Metadata = {
  title: "hisoles | engineered calm for long days",
  description:
    "Structured support + quiet cushion for long days on your feet. 90-day guarantee. Free returns.",
  openGraph: {
    title: "hisoles | engineered calm for long days",
    description:
      "Structured support + quiet cushion for long days on your feet. 90-day guarantee. Free returns.",
    type: "website",
  },
}

export default function OfferPage() {
  return (
    <div className="relative min-h-[100svh] w-full">
      <OfferHeader />

      <main>
        <OfferHero />
        <OfferProof />
        <OfferMechanism />
        <OfferBundles />
        <OfferGuarantee />
        <OfferFAQ />
        <OfferFinalCTA />
      </main>

      <OfferFooter />

      <Script id="hisoles-offer-preserve-query" strategy="beforeInteractive">
        {
          "(()=>{var s=location.search;if(!s)return;var p=new URLSearchParams(s);p.delete('add');var q=p.toString();if(!q)return;document.querySelectorAll('a[data-checkout-link]').forEach(function(a){var h=a.getAttribute('href');if(!h)return;a.setAttribute('href',h+(h.indexOf('?')>-1?'&':'?')+q)})})()"
        }
      </Script>
    </div>
  )
}
