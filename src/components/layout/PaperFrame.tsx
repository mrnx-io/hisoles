"use client";

export function PaperFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* Top edge shadow (paper depth) */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-[linear-gradient(to_bottom,rgba(26,26,26,0.08),transparent)] opacity-35" />

      {/* Bottom edge shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-[linear-gradient(to_top,rgba(26,26,26,0.10),transparent)] opacity-35" />

      {/* Meridian crease glow (subtle “fold” around the spine) */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[240px] bg-[radial-gradient(ellipse_at_center,rgba(26,26,26,0.05)_0%,transparent_70%)] opacity-70" />

      {/* Hairline crease at top/bottom (the paper seam motif) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-stone/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone/10" />
    </div>
  );
}

