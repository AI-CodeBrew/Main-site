"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type HeroProps = {
  videos?: string[];
  eyebrow?: string;
  title?: string;
  description?: string;
  trackingLocation?: string;
};

const defaultVideos = [
  "/videos/220941_small.mp4",
  "/videos/148596-794221551_small.mp4",
];

export function Hero({
  videos = defaultVideos,
  eyebrow = "Fynk Tech",
  title = "We build AI agents and e-commerce stores that grow revenue for businesses in the Gulf, UK and US",
  description = "From AI receptionists and CRM/OMS systems to Shopify launches — shipped from Lahore, built for real operations.",
  trackingLocation = "hero",
}: HeroProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-[90vh] md:min-h-screen">
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideoIndex}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover hero-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <source src={videos[currentVideoIndex]} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

      <div className="container-page relative z-10 flex min-h-[90vh] md:min-h-screen flex-col items-center justify-center text-center gap-6 py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm md:text-base font-semibold tracking-wide text-white/90"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="heading-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg max-w-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base md:text-xl max-w-2xl leading-relaxed text-white/90"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <Link
            href="/contact?intent=strategy-call"
            className="btn btn-primary text-base md:text-lg px-7 py-3.5"
            onClick={() => trackEvent("cta_click", { cta: "book_strategy_call", location: trackingLocation })}
          >
            Talk to an expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
