"use client";

import Image from "next/image";

interface PersimmonPhotoProps {
  src: string;
  alt: string;
  accentMaskSrc?: string; // white = show color, black = hide
  priority?: boolean;
  className?: string;
}

export function PersimmonPhoto({
  src,
  alt,
  accentMaskSrc,
  priority = false,
  className,
}: PersimmonPhotoProps) {
  return (
    <div className={className ?? "relative w-full h-full"}>
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
  );
}

