import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/layout/chat-widget";
import { UtmCapture } from "@/components/layout/utm-capture";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-aeonik" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fynktech.com"),
  title: {
    default: "FynkTech",
    template: "%s — Fynk Tech",
  },
  description:
    "Fynk Tech empowers businesses with AI automation, intelligent agents, and end-to-end e‑commerce solutions.",
  openGraph: {
    title: "FynkTech",
    description:
      "AI automation, intelligent agents, and full‑stack e‑commerce solutions.",
    url: "https://www.fynktech.com",
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
    title: "FynkTech",
    description:
      "Fynk Tech empowers businesses with AI automation, intelligent agents, and end-to-end e‑commerce solutions.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/favicon-32.png" />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased`}
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <Header />
        {children}
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
