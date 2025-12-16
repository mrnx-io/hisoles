import type { MetadataRoute } from "next";
import { COLORS } from "@/lib/colors";

/**
 * Web App Manifest for PWA support
 *
 * Technical constraint: PWA manifest spec requires literal color values.
 * CSS variables and OKLCH are not supported.
 *
 * Colors imported from centralized source: src/lib/colors.ts
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "hisoles | the art of standing",
    short_name: "hisoles",
    description: "Engineered calm for those who cannot stop.",
    start_url: "/",
    display: "standalone",
    background_color: COLORS.washi,
    theme_color: COLORS.sumi,
    icons: [
      {
        src: "/icon/16",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icon/32",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon/48",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon/512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
