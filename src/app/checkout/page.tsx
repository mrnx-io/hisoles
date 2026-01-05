"use client"

import { WhopCheckoutEmbed } from "@whop/checkout/react"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

const WHOP_PLANS = {
  trial: {
    planId: "plan_cwG6whyLJ8BdT",
    name: "1 Pair",
    price: 39,
  },
  rotation: {
    planId: "plan_6FpGCijHGYgxj",
    name: "3 Pairs",
    price: 69,
  },
} as const

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutPageInner />
    </Suspense>
  )
}

function CheckoutFallback() {
  return (
    <main
      id="main"
      className="bg-washi text-sumi flex min-h-[100svh] flex-col items-center justify-center px-6 py-20"
    >
      <div className="mx-auto max-w-md text-center">
        <div className="bg-persimmon/10 mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full">
          <Loader2 className="text-persimmon animate-spin" size={28} />
        </div>
        <p className="k-kicker mb-4">Preparing</p>
        <h1 className="k-title k-title-xl">Loading checkout.</h1>
        <p className="k-body mt-6 text-sm">One moment…</p>
      </div>
    </main>
  )
}

function CheckoutPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const addParam = searchParams.get("add") as keyof typeof WHOP_PLANS | null

  const plan = addParam ? WHOP_PLANS[addParam] : WHOP_PLANS.rotation

  if (!plan) {
    return (
      <main
        id="main"
        className="bg-washi text-sumi flex min-h-[100svh] flex-col items-center justify-center px-6 py-20"
      >
        <div className="mx-auto max-w-md text-center">
          <p className="k-kicker mb-4">Invalid Plan</p>
          <h1 className="k-title k-title-xl">Something went wrong.</h1>
          <p className="k-body mt-6 text-sm">Please try again from the offer page.</p>
          <Link
            href="/offer"
            className="bg-sumi text-washi font-body hover:bg-persimmon mt-10 inline-flex h-12 items-center justify-center px-8 text-sm tracking-widest uppercase transition-colors"
          >
            Back to Offer
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="bg-washi text-sumi min-h-[100svh] px-6 pt-24 pb-20 md:px-12">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-stone hover:text-persimmon mb-8 flex items-center gap-2 font-mono text-xs uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <p className="k-kicker mb-4">Checkout</p>
        <h1 className="k-title k-title-xl">Almost there.</h1>

        <div className="border-stone/10 mt-8 border-t pt-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-body text-sumi text-lg">{plan.name}</p>
              <p className="k-whisper mt-1">Stepprs Comfort Insoles</p>
            </div>
            <p className="text-sumi font-mono text-xl">${plan.price}</p>
          </div>

          <div className="border-stone/10 border-t pt-6">
            <WhopCheckoutEmbed
              planId={plan.planId}
              theme="light"
              returnUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/checkout/complete`}
              hidePrice
              fallback={
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="text-persimmon animate-spin" size={24} />
                </div>
              }
            />
          </div>
        </div>

        <div className="border-stone/10 mt-8 border-t pt-6">
          <div className="text-stone/60 flex justify-center gap-8 font-mono text-[10px] tracking-widest uppercase">
            <span>90-day guarantee</span>
            <span>Free returns</span>
          </div>
        </div>

        <p className="k-whisper mt-8 text-center">Relief is ritual.</p>
      </div>
    </main>
  )
}
