"use client";

import { useState, useRef } from "react";

interface VideoHeroProps {
  title: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function VideoHero({
  title,
  subtitle,
  description,
  videoSrc,
  posterSrc,
  ctaText = "Get Started",
  ctaLink = "/contact"
}: VideoHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          onLoadedData={handleVideoLoad}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        
        {/* Loading placeholder */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-white dark:bg-[#070643] flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container-page text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 heading-display">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-200 font-medium">
            {subtitle}
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          
          {ctaText && ctaLink && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ctaLink}
                className="btn btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                {ctaText}
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
