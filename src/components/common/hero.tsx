"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const videos = [
    "/videos/220941_small.mp4",
    "/videos/148596-794221551_small.mp4"
  ];

  // Switch videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [videos.length]);

  // Handle video end event to ensure smooth transitions
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Preload next video for smoother transitions
  useEffect(() => {
    const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = document.createElement('video');
    nextVideo.src = videos[nextVideoIndex];
    nextVideo.preload = 'auto';
    
    return () => {
      nextVideo.remove();
    };
  }, [currentVideoIndex, videos]);

  return (
    <section id="home" className="relative overflow-hidden min-h-screen">
      {/* Video Background */}
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
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Video Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {videos.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full hero-video-indicator ${
              index === currentVideoIndex ? 'bg-white' : 'bg-white/50'
            }`}
            animate={{
              scale: index === currentVideoIndex ? 1.2 : 1,
              opacity: index === currentVideoIndex ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      
      <div className="container-page relative z-10 flex min-h-screen flex-col items-center justify-center text-center gap-8 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="heading-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white drop-shadow-lg"
        >
          Building the future of AI and ecommerce innovation
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-4xl leading-relaxed text-white/90 drop-shadow-md"
        >
          FynkTech empowers businesses with AI Automation, smart agents and end-to-end ecommerce solutions
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <a href="#contact" className="btn btn-primary text-lg px-8 py-4">Get in Touch</a>
        </motion.div>
      </div>
    </section>
  );
}


