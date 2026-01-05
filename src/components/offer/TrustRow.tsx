import { Lock, ShieldCheck, Star, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustRowProps {
  className?: string
  showSecure?: boolean
  showRating?: boolean
  showPaymentBadges?: boolean
  variant?: "default" | "compact"
}

export function TrustRow({
  className,
  showSecure = true,
  showRating = false,
  showPaymentBadges = false,
  variant = "default",
}: TrustRowProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-x-3 gap-y-2", className)}>
        <span className="k-whisper">90-day money-back</span>
        <span className="text-stone/30">·</span>
        <span className="k-whisper">Free returns</span>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {showRating && (
          <span className="k-whisper flex items-center gap-1.5">
            <Star className="fill-persimmon text-persimmon h-3.5 w-3.5" />
            4.8/5 (247 reviews)
          </span>
        )}
        {showSecure && (
          <span className="k-whisper flex items-center gap-1.5">
            <Lock className="text-stone/60 h-3 w-3" />
            SSL Encrypted
          </span>
        )}
        <span className="k-whisper flex items-center gap-1.5">
          <ShieldCheck className="text-stone/60 h-3.5 w-3.5" />
          90-day money-back
        </span>
        <span className="k-whisper flex items-center gap-1.5">
          <Truck className="text-stone/60 h-3.5 w-3.5" />
          Ships in 1-2 days
        </span>
      </div>

      {showPaymentBadges && (
        <div className="flex items-center gap-2">
          <PaymentBadge type="visa" />
          <PaymentBadge type="mastercard" />
          <PaymentBadge type="amex" />
          <PaymentBadge type="paypal" />
        </div>
      )}
    </div>
  )
}

function PaymentBadge({ type }: { type: "visa" | "mastercard" | "amex" | "paypal" }) {
  const badges = {
    visa: (
      <svg viewBox="0 0 38 24" className="h-5 w-auto" role="img" aria-labelledby="tr-visa-title">
        <title id="tr-visa-title">Visa</title>
        <rect fill="#F6F6F6" width="38" height="24" rx="3" />
        <path
          fill="#1A1F71"
          d="M15.3 15.4h-2.2l1.4-8.5h2.2l-1.4 8.5zm8.8-8.3c-.4-.2-1.1-.3-2-.3-2.2 0-3.7 1.2-3.7 2.8 0 1.2 1.1 1.9 2 2.3.9.4 1.2.7 1.2 1.1 0 .6-.7.9-1.4.9-.9 0-1.4-.1-2.2-.5l-.3-.1-.3 2c.5.2 1.5.4 2.6.4 2.3 0 3.8-1.1 3.9-2.9 0-1-.6-1.7-1.8-2.3-.8-.4-1.2-.7-1.2-1.1 0-.4.4-.8 1.2-.8.7 0 1.2.2 1.6.3l.2.1.2-1.9zm5.5-.2h-1.7c-.5 0-.9.1-1.1.7l-3.2 7.8h2.3l.5-1.3h2.8l.3 1.3h2l-1.9-8.5zm-2.7 5.5l.9-2.5.5 2.5h-1.4zM12.7 6.9L10.5 13l-.2-1.2c-.4-1.4-1.7-2.9-3.2-3.7l2 7.3h2.4l3.5-8.5h-2.3z"
        />
        <path
          fill="#F9A51A"
          d="M8.3 6.9H4.8l-.1.3c2.9.7 4.8 2.5 5.6 4.6l-.8-4.1c-.1-.5-.5-.8-1.2-.8z"
        />
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 38 24" className="h-5 w-auto" role="img" aria-labelledby="tr-mc-title">
        <title id="tr-mc-title">Mastercard</title>
        <rect fill="#F6F6F6" width="38" height="24" rx="3" />
        <circle fill="#EA001B" cx="15" cy="12" r="6" />
        <circle fill="#F79F1A" cx="23" cy="12" r="6" />
        <path fill="#FF5F01" d="M19 7.5a6 6 0 000 9 6 6 0 000-9z" />
      </svg>
    ),
    amex: (
      <svg viewBox="0 0 38 24" className="h-5 w-auto" role="img" aria-labelledby="tr-amex-title">
        <title id="tr-amex-title">American Express</title>
        <rect fill="#1F72CD" width="38" height="24" rx="3" />
        <path
          fill="#fff"
          d="M10 15.5V8.5h5.5l.6 1.3.7-1.3H22v.5l.5-.5h3l.5.8V8.5h3v7h-3l-.5-.8v.8h-3.7l-.4-1h-.9l-.4 1h-2v-.6l-.3.6h-1.8l-.3-.6v.6H10zm1-1h1.5v-1.2l.8 1.2h.9l.8-1.2v1.2h1.5v-5h-1.4l-.9 1.5-.9-1.5h-1.3v5zm8.5-2.5l-1.5 2.5h1l.3-.6h1.7l.3.6h1l-1.5-2.5 1.5-2.5h-1l-.3.6h-1.7l-.3-.6h-1l1.5 2.5zm.6-.8l.4.8h-.8l.4-.8zm3.4 3.3h3.5v-1h-2v-1h2v-1h-2v-1h2v-1h-3.5v5z"
        />
      </svg>
    ),
    paypal: (
      <svg viewBox="0 0 38 24" className="h-5 w-auto" role="img" aria-labelledby="tr-paypal-title">
        <title id="tr-paypal-title">PayPal</title>
        <rect fill="#F6F6F6" width="38" height="24" rx="3" />
        <path
          fill="#253B80"
          d="M23.5 8.5h-3.7c-.3 0-.5.2-.5.4l-1.5 9.6c0 .2.1.4.3.4h1.8c.3 0 .5-.2.5-.4l.4-2.6c0-.2.3-.4.5-.4h1.2c2.5 0 3.9-1.2 4.3-3.5.2-1 0-1.8-.5-2.4-.5-.7-1.5-1.1-2.8-1.1zm.4 3.5c-.2 1.4-1.2 1.4-2.2 1.4h-.6l.4-2.5c0-.1.1-.2.3-.2h.3c.7 0 1.3 0 1.6.4.2.2.3.5.2 1z"
        />
        <path
          fill="#179BD7"
          d="M12.5 8.5H8.8c-.3 0-.5.2-.5.4L6.8 18.5c0 .2.1.4.3.4h1.7c.2 0 .4-.1.4-.3l.4-2.7c0-.2.3-.4.5-.4h1.2c2.5 0 3.9-1.2 4.3-3.5.2-1 0-1.8-.5-2.4-.6-.7-1.6-1.1-2.8-1.1zm.4 3.5c-.2 1.4-1.2 1.4-2.2 1.4h-.6l.4-2.5c0-.1.1-.2.3-.2h.3c.7 0 1.3 0 1.6.4.2.2.3.5.2.9z"
        />
      </svg>
    ),
  }

  return badges[type]
}
