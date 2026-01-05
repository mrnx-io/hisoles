import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Script from "next/script"
import { OfferFAQ } from "@/components/offer/OfferFAQ"
import { OfferFinalCTA } from "@/components/offer/OfferFinalCTA"
import { OfferFooter } from "@/components/offer/OfferFooter"
import { OfferGuarantee } from "@/components/offer/OfferGuarantee"
import { OfferHeader } from "@/components/offer/OfferHeader"
import { OfferHero } from "@/components/offer/OfferHero"
import { OfferMechanism } from "@/components/offer/OfferMechanism"
import { OfferProof } from "@/components/offer/OfferProof"
import { OfferStickyCTA } from "@/components/offer/OfferStickyCTA"

// Lazy load below-fold heavy component (bundles with images)
const OfferBundles = dynamic(() =>
  import("@/components/offer/OfferBundles").then((mod) => mod.OfferBundles)
)

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
      {/* Preconnect to Whop for faster checkout navigation */}
      <link rel="preconnect" href="https://whop.com" />
      <link rel="dns-prefetch" href="https://whop.com" />

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

      <OfferStickyCTA />

      {/* Query preservation - moved to afterInteractive to not block render */}
      <Script id="hisoles-offer-preserve-query" strategy="afterInteractive">
        {
          "(()=>{var s=location.search;if(!s)return;var p=new URLSearchParams(s);p.delete('add');var q=p.toString();if(!q)return;document.querySelectorAll('a[data-checkout-link]').forEach(function(a){var h=a.getAttribute('href');if(!h)return;a.setAttribute('href',h+(h.indexOf('?')>-1?'&':'?')+q)})})()"
        }
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '925445993138360');
          fbq('track', 'PageView');
          fbq('track', 'ViewContent', {
            content_name: 'Offer Page',
            content_category: 'Landing Page'
          });
        `}
      </Script>

      {/* InitiateCheckout on CTA click */}
      <Script id="meta-pixel-checkout" strategy="afterInteractive">
        {`
          document.addEventListener('click', function(e) {
            var link = e.target.closest('[data-checkout-link]');
            if (link && typeof fbq !== 'undefined') {
              var href = link.getAttribute('href') || '';
              var plan = href.includes('trial') ? 'trial' : 'rotation';
              var value = plan === 'trial' ? 39 : 69;
              fbq('track', 'InitiateCheckout', {
                content_name: plan === 'trial' ? '1 Pair' : '3 Pairs',
                content_category: 'Insoles',
                value: value,
                currency: 'USD'
              });
            }
          });
        `}
      </Script>
    </div>
  )
}
