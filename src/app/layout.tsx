import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DeferredChatLauncher } from "@/components/layout/deferred-chat-launcher";
import { DeferredAnalytics } from "@/components/layout/deferred-analytics";
import { SiteChrome } from "@/components/layout/site-chrome";
import { UtmCapture } from "@/components/layout/utm-capture";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SITE_URL } from "@/lib/seo";

// Single family for body + hero headings. preload + display swap keeps LCP text visible.
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-aeonik",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FynkTech | AI Agents & E-commerce Stores",
    template: "%s | FynkTech",
  },
  description:
    "FynkTech builds AI agents and e-commerce stores for businesses worldwide. Delivery center in Lahore, Pakistan. Talk to an expert today.",
  applicationName: "FynkTech",
  openGraph: {
    title: "FynkTech | AI Agents & E-commerce Stores",
    description:
      "AI agents and e-commerce stores for global businesses — engineered in Lahore.",
    url: SITE_URL,
    siteName: "FynkTech",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FynkTech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FynkTech | AI Agents & E-commerce Stores",
    description:
      "AI agents and e-commerce stores for global businesses — engineered in Lahore.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon-48.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <SmoothScroll />
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <SiteChrome>
          <Header />
        </SiteChrome>
        {children}
        <SiteChrome>
          <Footer />
        </SiteChrome>
        <DeferredChatLauncher />
        <DeferredAnalytics />
      </body>
    </html>
  );
}
