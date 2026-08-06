"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface RegionHeroProps {
  region: 'mena' | 'europe-uk' | 'america' | 'global' | 'ksa-en';
}

export function RegionHero({ region }: RegionHeroProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Define videos for each region
  const regionVideos = {
    mena: [
      "/videos/6719ad0ceed6d5aa24a83d61_67481679b9cd09200f69661b_mena-transcode.mp4",
      "/videos/111239-690770604_small.mp4"
    ],
    'ksa-en': [
      "/videos/198048-906522343_small.mp4",
      "/videos/Gulf.mp4"
    ],
    'europe-uk': [
      "/videos/287393_small.mp4",
      "/videos/143809-784164099_small.mp4"
    ],
    america: [
      "/videos/121994-724732238_small.mp4"
    ],
    global: [
      "/videos/220941_small.mp4",
      "/videos/148596-794221551_small.mp4"
    ]
  };

  const videos = regionVideos[region] || regionVideos.global;

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
      {videos.length > 1 && (
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
      )}
      
      <div className="container-page relative z-10 flex min-h-screen flex-col items-center justify-center text-center gap-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 heading-display text-white">
            {region === 'mena' && 'MENA Innovation Hub'}
            {region === 'ksa-en' && 'KSA & Gulf Excellence'}
            {region === 'europe-uk' && 'European Excellence'}
            {region === 'america' && 'American Innovation'}
            {region === 'global' && 'Transform Your Business'}
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-blue-200 font-medium">
            {region === 'mena' && 'Digital Solutions Across Middle East & North Africa'}
            {region === 'ksa-en' && 'AI-Powered Solutions for KSA & Gulf Region\'s Vision 2030'}
            {region === 'europe-uk' && 'Digital Innovation Across Europe & the UK'}
            {region === 'america' && 'Transforming Business Across the United States'}
            {region === 'global' && 'AI-Powered Automation & E-commerce Solutions'}
          </p>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {region === 'mena' && 'Empowering MENA businesses with cutting-edge AI automation and e-commerce solutions tailored for the unique needs of the Middle East and North Africa markets.'}
            {region === 'ksa-en' && 'Empowering KSA & Gulf businesses with advanced AI automation and e-commerce solutions that align with Vision 2030\'s digital transformation goals and drive sustainable growth across the region.'}
            {region === 'europe-uk' && 'Empowering European businesses with sophisticated AI automation and e-commerce solutions that meet GDPR compliance, cultural diversity, and the unique needs of the European market.'}
            {region === 'america' && 'Empowering American enterprises with cutting-edge AI automation and e-commerce solutions that drive growth, efficiency, and competitive advantage in the world\'s largest economy.'}
            {region === 'global' && 'Empowering businesses worldwide with intelligent automation, AI agents, and scalable e-commerce solutions that drive growth and efficiency.'}
          </p>
          
          <div className="flex justify-center">
            <a
              href="/contact"
              className="btn btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Get Started
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
