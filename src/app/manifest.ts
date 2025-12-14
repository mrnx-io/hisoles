import type { MetadataRoute } from "next";

/**
 * Web App Manifest for PWA support
 *
 * Technical constraint: PWA manifest spec requires literal color values.
 * CSS variables and OKLCH are not supported.
 *
 * These HEX values MUST match the source of truth in: src/app/globals.css @theme block
 * If brand colors change, update both locations.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "hisoles | the art of standing",
    short_name: "hisoles",
    description: "Engineered calm for those who cannot stop.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6", // --color-washi
    theme_color: "#1A1A1A", // --color-sumi
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
