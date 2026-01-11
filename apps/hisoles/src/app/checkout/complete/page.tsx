"use client"

import { Check, X } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={<div className="bg-washi min-h-[100svh]" />}>
      <CheckoutCompleteInner />
    </Suspense>
  )
}

function CheckoutCompleteInner() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")

  const isSuccess = status === "success"

  return (
    <main
      id="main"
      className="bg-washi text-sumi flex min-h-[100svh] flex-col items-center justify-center px-6 py-20"
    >
      <div className="mx-auto max-w-md text-center">
        <div
          className={`mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full ${
            isSuccess ? "bg-persimmon/10" : "bg-stone/10"
          }`}
        >
          {isSuccess ? (
            <Check className="text-persimmon" size={32} />
          ) : (
            <X className="text-stone" size={32} />
          )}
        </div>

        {isSuccess ? (
          <>
            <p className="k-kicker mb-4">Order Confirmed</p>
            <h1 className="k-title k-title-xl">Relief is coming.</h1>
            <p className="k-body mt-6 text-sm">
              Thank you for your order. You&apos;ll receive a confirmation email shortly.
            </p>
          </>
        ) : (
          <>
            <p className="k-kicker mb-4">Payment Issue</p>
            <h1 className="k-title k-title-xl">Something went wrong.</h1>
            <p className="k-body mt-6 text-sm">Your payment was not completed. Please try again.</p>
          </>
        )}

        <Link
          href={isSuccess ? "/" : "/offer"}
          className="bg-sumi text-washi font-body hover:bg-persimmon mt-10 inline-flex h-12 items-center justify-center px-8 text-sm tracking-widest uppercase transition-colors"
        >
          {isSuccess ? "Return Home" : "Try Again"}
        </Link>
      </div>
    </main>
  )
}
