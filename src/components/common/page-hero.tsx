"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  showButtons?: boolean;
  backgroundImage?: string;
}

export function PageHero({ title, subtitle, description, showButtons = true, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Semi-transparent dark overlay covering bottom half */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}
      
      {/* Fallback gradient background if no image */}
      {!backgroundImage && (
        <>
          <div className="animated-gradient" aria-hidden="true" />
          <div className="noise absolute inset-0 mesh-overlay" aria-hidden="true" />
        </>
      )}
      
      {/* Content positioned at bottom with left alignment */}
      <div className="container-page relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Text content with blurred background overlay */}
          <div className="relative">
            {/* Blurred overlay behind text and button */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl -m-4" />
            
            <div className="relative z-10 p-6">
              {/* Small label above title */}
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider"
                >
                  {subtitle}
                </motion.div>
              )}

              {/* Bold Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
              >
                {title}
              </motion.h1>

              {/* Description */}
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
                >
                  {description}
                </motion.p>
              )}

              {/* CTA Button - inside the blurred section */}
              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white font-semibold rounded-lg hover:from-[#070643] hover:to-[#16213e] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
