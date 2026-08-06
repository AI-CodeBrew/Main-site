"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

interface StickyVideoSplitProps {
  videoSrc: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export function StickyVideoSplit({
  videoSrc,
  title,
  subtitle,
  description,
  features = [],
  ctaText = "Join Us",
  ctaLink = "/careers"
}: StickyVideoSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Video width animation: 100% -> 50% (desktop) / 100% -> 100% (mobile)
  const videoWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["100%", "90%", "50%", "50%"]
  );

  // Video height animation: 100vh -> 80vh (desktop) / 60vh -> 50vh (mobile)
  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["100vh", "90vh", "80vh", "80vh"]
  );

  // Video translateY animation: 0% -> 0%
  const videoTranslateY = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    ["0%", "0%", "0%"]
  );

  // Content width animation: 0% -> 50% (desktop) / 0% -> 100% (mobile)
  const contentWidth = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    ["0%", "50%"]
  );

  // Content opacity animation
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [0, 1]
  );

  // Content translateY animation
  const contentTranslateY = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [40, 0]
  );

  // Spring animations for smooth motion
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothVideoWidth = useSpring(videoWidth, springConfig);
  const smoothVideoHeight = useSpring(videoHeight, springConfig);
  const smoothVideoTranslateY = useSpring(videoTranslateY, springConfig);
  const smoothContentWidth = useSpring(contentWidth, springConfig);
  const smoothContentOpacity = useSpring(contentOpacity, springConfig);
  const smoothContentTranslateY = useSpring(contentTranslateY, springConfig);

  // Video autoplay handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {
        console.log('Video autoplay blocked');
      });
    };

    // Try to play immediately
    playVideo();

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] md:min-h-[200vh] min-h-[300vh] bg-white"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-[100vh] flex items-center justify-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-3 px-4 md:px-0">
          {/* Video container */}
          <motion.div
            className="relative overflow-hidden rounded-[4px] bg-[#070643] shadow-lg flex-shrink-0 w-full md:w-auto"
            style={{
              width: smoothVideoWidth,
              height: smoothVideoHeight,
            }}
          >
            <motion.div
              className="h-full w-full"
              style={{
                transform: `translateY(${smoothVideoTranslateY})`,
              }}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={videoSrc}
                poster={videoSrc.replace('.mp4', '.jpg')}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                data-wf-ignore="true"
                data-object-fit="cover"
              >
                <source src={videoSrc} type="video/mp4" />
                <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
              </video>
            </motion.div>
            
            {/* Video overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </motion.div>

          {/* Content panel */}
          <motion.div
            className="relative self-center max-w-[660px] rounded-[4px] bg-white/90 backdrop-blur-sm p-4 md:p-8 shadow-lg flex-shrink-0 w-full md:w-auto"
            style={{
              width: smoothContentWidth,
              opacity: smoothContentOpacity,
              transform: `translateY(${smoothContentTranslateY}px)`,
            }}
          >
            {subtitle && (
              <div className="mb-4">
                <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#80DFFF]">
                  {subtitle}
                </p>
              </div>
            )}

            <div className="mb-4">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight text-[#070643]">
                {title}
              </h2>
            </div>

            <div className="mb-6">
              <p className="text-base md:text-lg text-[#4A5568] leading-relaxed">
                {description}
              </p>
            </div>

            {features.length > 0 && (
              <ul className="mb-8 space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#070643] flex-shrink-0" />
                    <span className="text-[#4A5568]">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#070643] to-[#5A83FF] hover:from-[#0A0045] hover:to-[#4A6BFF] transition-all duration-300 shadow-lg"
            >
              {ctaText}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Spacer below */}
      <div className="h-[100vh]" />
    </section>
  );
}
