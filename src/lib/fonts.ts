import localFont from "next/font/local";
import { Inter } from "next/font/google";

/** Display / headings — General Sans variable (Fontshare). */
export const fontDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Variable.woff2",
      style: "normal",
      weight: "200 700",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
  preload: true,
  fallback: ["Geist", "sans-serif"],
});

/** Body — Inter. */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});
