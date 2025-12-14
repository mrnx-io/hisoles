import { ImageResponse } from "next/og";

/**
 * Brand colors for ImageResponse (next/og)
 *
 * Technical constraint: ImageResponse uses Satori + resvg-js which do NOT support:
 * - CSS variables (var(--color-*))
 * - OKLCH color format
 *
 * These HEX values MUST match the source of truth in: src/app/globals.css @theme block
 * If brand colors change, update both locations.
 */
export const WASHI = "#FAF9F6"; // --color-washi
export const SUMI = "#1A1A1A"; // --color-sumi
export const PERSIMMON = "#E85D04"; // --color-persimmon

/**
 * Typography-based proportions derived from the homepage logo:
 * - Font: General Sans at text-3xl (30px)
 * - Dot: 6px diameter at top-[0.18em] position
 * - Stem: dotless "ı" character (x-height ≈ 50% of em)
 *
 * These ratios create a favicon that matches the typographic "i" exactly.
 */
const PROPORTIONS = {
  // Dot diameter: slightly larger for visual presence
  dot: 0.22,
  // Stem width: matches typical stroke width of General Sans (~12% of em)
  stemWidth: 0.12,
  // Stem height: x-height ratio (~48% of em for this font)
  stemHeight: 0.48,
  // Gap: space between dot bottom and stem top (~8% of em)
  gap: 0.08,
} as const;

/** Round to nearest even number for pixel-perfect rendering */
function makeEven(n: number): number {
  const rounded = Math.round(n);
  return rounded % 2 === 0 ? rounded : rounded + 1;
}

/** Render the hisoles "i" icon at the given size */
export function renderIcon(size: number): ImageResponse {
  // Calculate dimensions based on typographic proportions
  const dotSize = Math.max(4, makeEven(size * PROPORTIONS.dot));
  const stemWidth = Math.max(2, makeEven(size * PROPORTIONS.stemWidth));
  const stemHeight = Math.max(6, makeEven(size * PROPORTIONS.stemHeight));
  const gap = Math.max(1, Math.round(size * PROPORTIONS.gap));

  // Subtle glow on larger icons (matches TravelingDot glow aesthetic)
  const glowSize = Math.round(size * 0.035);
  const dotGlow =
    size >= 64
      ? `0 0 ${Math.max(4, glowSize)}px rgba(232, 93, 4, 0.55)`
      : "none";

  return new ImageResponse(
    (
      <div
        style={{
          background: WASHI,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        {/* The "i" mark container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: `${gap}px`,
          }}
        >
          {/* Dot (tittle) */}
          <div
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: "50%",
              background: PERSIMMON,
              boxShadow: dotGlow,
            }}
          />
          {/* Stem */}
          <div
            style={{
              width: `${stemWidth}px`,
              height: `${stemHeight}px`,
              background: SUMI,
            }}
          />
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}
