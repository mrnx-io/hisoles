import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const generalSans = localFont({
  src: "../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
});

const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "hisoles | the art of standing",
  description: "Engineered calm for those who cannot stop.",
  keywords: ["insoles", "comfort", "healthcare", "nursing", "standing"],
  openGraph: {
    title: "hisoles | the art of standing",
    description: "Engineered calm for those who cannot stop.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} ${switzer.variable} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
