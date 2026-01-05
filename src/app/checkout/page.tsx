"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import type { CheckoutFormData } from "@/lib/schemas/checkout"
import { checkoutSchema } from "@/lib/schemas/checkout"
import { selectTotalPrice, useCartStore } from "@/stores/cart-store"
import { submitCheckout } from "./actions"

const OFFER_ITEMS = {
  trial: { id: "trial", name: "1 Pair", price: 39 },
  rotation: { id: "rotation", name: "2 Pairs", price: 69 },
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
  const addParam = searchParams.get("add")

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [serverMessage, setServerMessage] = useState("")
  const [isAutoAdding, setIsAutoAdding] = useState(false)
  const autoAddOnce = useRef(false)

  const items = useCartStore((s) => s.items)
  const hasHydrated = useCartStore((s) => s.hasHydrated)
  const addItem = useCartStore((s) => s.addItem)
  const closeCart = useCartStore((s) => s.closeCart)
  const clearCart = useCartStore((s) => s.clearCart)
  const totalPrice = useCartStore(selectTotalPrice)

  useEffect(() => {
    if (!hasHydrated) return
    if (!addParam) return

    const params = new URLSearchParams(searchParams.toString())
    params.delete("add")
    const nextUrl = params.toString() ? `/checkout?${params.toString()}` : "/checkout"

    if (items.length > 0) {
      router.replace(nextUrl)
      return
    }

    if (autoAddOnce.current) return
    const offer = OFFER_ITEMS[addParam as keyof typeof OFFER_ITEMS]

    autoAddOnce.current = true

    if (!offer) {
      router.replace(nextUrl)
      return
    }

    setIsAutoAdding(true)
    addItem({ id: offer.id, name: offer.name, price: offer.price })
    closeCart()
    router.replace(nextUrl)
    setIsAutoAdding(false)
  }, [addItem, addParam, closeCart, hasHydrated, items.length, router, searchParams])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = (data: CheckoutFormData) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append("email", data.email)
      formData.append("name", data.name)

      const result = await submitCheckout(formData)

      if (result.success) {
        setSuccess(true)
        setServerMessage(result.message ?? "Order confirmed!")
        clearCart()
      } else if (result.errors) {
        if (result.errors.email) {
          setError("email", { message: result.errors.email[0] })
        }
        if (result.errors.name) {
          setError("name", { message: result.errors.name[0] })
        }
      }
    })
  }

  if (success) {
    return (
      <main
        id="main"
        className="bg-washi text-sumi flex min-h-[100svh] flex-col items-center justify-center px-6 py-20"
      >
        <div className="mx-auto max-w-md text-center">
          <div className="bg-persimmon/10 mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full">
            <Check className="text-persimmon" size={32} />
          </div>
          <p className="k-kicker mb-4">Order Confirmed</p>
          <h1 className="k-title k-title-xl">Relief is coming.</h1>
          <p className="k-body mt-6 text-sm">{serverMessage}</p>
          <Link
            href="/"
            className="bg-sumi text-washi font-body hover:bg-persimmon mt-10 inline-flex h-12 items-center justify-center px-8 text-sm tracking-widest uppercase transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    const isPreparingCart = Boolean(addParam) && (!hasHydrated || isAutoAdding)

    return (
      <main
        id="main"
        className="bg-washi text-sumi flex min-h-[100svh] flex-col items-center justify-center px-6 py-20"
      >
        <div className="mx-auto max-w-md text-center">
          {isPreparingCart ? (
            <>
              <div className="bg-persimmon/10 mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full">
                <Loader2 className="text-persimmon animate-spin" size={28} />
              </div>
              <p className="k-kicker mb-4">Preparing</p>
              <h1 className="k-title k-title-xl">Loading your offer.</h1>
              <p className="k-body mt-6 text-sm">One moment…</p>
            </>
          ) : (
            <>
              <p className="k-kicker mb-4">Cart Empty</p>
              <h1 className="k-title k-title-xl">Nothing here yet.</h1>
              <p className="k-body mt-6 text-sm">Add some items to your cart to continue.</p>
            </>
          )}
          <Link
            href="/"
            className="bg-sumi text-washi font-body hover:bg-persimmon mt-10 inline-flex h-12 items-center justify-center px-8 text-sm tracking-widest uppercase transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="bg-washi text-sumi min-h-[100svh] px-6 pt-32 pb-20 md:px-12">
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

        {/* Order Summary */}
        <div className="border-stone/10 mt-10 border-t pt-6">
          <h2 className="k-kicker mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="mb-3 flex justify-between text-sm">
              <span className="font-body">
                {item.name} <span className="text-stone">x{item.quantity}</span>
              </span>
              <span className="font-mono">${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-stone/10 mt-4 flex justify-between border-t pt-4">
            <span className="font-body font-medium">Total</span>
            <span className="font-mono text-lg">${totalPrice}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <div>
            <label htmlFor="name" className="k-kicker mb-2 block">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="border-stone/20 focus:border-persimmon bg-washi font-body h-12 w-full border px-4 text-sm transition-colors outline-none"
              placeholder="Your name"
            />
            {errors.name && <p className="text-persimmon mt-2 text-xs">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="k-kicker mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border-stone/20 focus:border-persimmon bg-washi font-body h-12 w-full border px-4 text-sm transition-colors outline-none"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-persimmon mt-2 text-xs">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-sumi text-washi font-body hover:bg-persimmon flex h-14 w-full items-center justify-center gap-2 tracking-widest uppercase shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Order"
            )}
          </button>
        </form>

        <p className="k-whisper mt-10 text-center">Relief is ritual.</p>
      </div>
    </main>
  )
}
