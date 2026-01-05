"use client"

import Image from "next/image"

interface PersimmonPhotoProps {
  src: string
  alt: string
  accentMaskSrc?: string // white = show color, black = hide
  priority?: boolean
  className?: string
}

/**
 * Three-layer image component for persimmon-accent photography effect.
 *
 * **Design rationale:** This component intentionally uses 3 Image instances
 * to achieve a precise visual effect that cannot be replicated with CSS alone:
 *
 * 1. Base color image - full color version
 * 2. Grayscale overlay - applies `mix-blend-mode: color` for desaturation
 * 3. Masked color layer - brings back color only in mask-defined regions
 *
 * The combination creates the signature "persimmon accent" look where most
 * of the image is desaturated but key areas (defined by mask) retain color.
 *
 * **Note:** While this creates 3 DOM nodes per photo, Next.js Image optimization
 * ensures the same src is only fetched once. The visual fidelity is worth the
 * DOM overhead for the distinctive brand aesthetic.
 */
export function PersimmonPhoto({
  src,
  alt,
  accentMaskSrc,
  priority = false,
  className,
}: PersimmonPhotoProps) {
  return (
    <div className={className ?? "relative h-full w-full"}>
      {/* Base image (color) */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
        className="object-cover"
      />

      {/* Global desaturation layer (turns everything grayscale) */}
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
        className="object-cover"
        style={{
          filter: "grayscale(1) contrast(1.2) brightness(0.9)",
          mixBlendMode: "color",
        }}
      />

      {/* Bring back color ONLY where mask is white */}
      {accentMaskSrc ? (
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url(${accentMaskSrc})`,
            maskImage: `url(${accentMaskSrc})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <Image
            src={src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {/* Vignette depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(26,26,26,0.38)_100%)]" />
    </div>
  )
}
