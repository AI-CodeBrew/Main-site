"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const posts = [
  {
    id: 1,
    type: "case-study" as const,
    title: "US Fashion Resale Platform Scales to 100K Monthly Transactions",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop&crop=center",
    href: "#",
    readingTime: "5 min read"
  },
  {
    id: 2,
    type: "blog" as const,
    title: "Custom Web App Development: Everything You Need to Know",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop&crop=center",
    href: "#",
    readingTime: "3 min read"
  },
  {
    id: 3,
    type: "case-study" as const,
    title: "Hospitality AI Platform Reconciles $300M+ in OTA Commissions Automatically",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop&crop=center",
    href: "#",
    readingTime: "7 min read"
  },
  {
    id: 4,
    type: "blog" as const,
    title: "How Cloud Computing Can Transform Small Businesses",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop&crop=center",
    href: "#",
    readingTime: "4 min read"
  },
  {
    id: 5,
    type: "blog" as const,
    title: "Trends of Mobile Design: What's Next for Your Business?",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=400&fit=crop&crop=center",
    href: "#",
    readingTime: "6 min read"
  },
  {
    id: 6,
    type: "blog" as const,
    title: "How Generative AI is Transforming Business Operations",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
    href: "#",
    readingTime: "5 min read"
  },
  {
    id: 7,
    type: "case-study" as const,
    title: "US Fintech's AI Financial Modeling Secures $2M+ Funding",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=400&fit=crop&crop=center",
    href: "#",
    readingTime: "8 min read"
  }
];

export function CaseStudies() {
  return (
    <section className="py-16 md:py-24 right-side-shadow" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Enhanced Background Layers */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(90, 131, 255, 0.03) 0%, rgba(1, 180, 210, 0.02) 50%, rgba(10, 0, 69, 0.04) 100%)',
          filter: 'blur(1px)'
        }}
      />
      
      {/* Floating elements */}
      <div 
        className="absolute top-1/3 right-1/4 w-72 h-72 pointer-events-none floating-element"
        style={{
          background: 'radial-gradient(circle, rgba(1, 180, 210, 0.04) 0%, transparent 70%)',
          filter: 'blur(2px)',
          animationDelay: '1s'
        }}
      />
      
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-8 md:gap-12 items-center">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="min-w-0 lg:min-w-[360px]"
          >
            {/* Eyebrow Label */}
            <div className="mb-2">
              <span 
                className="text-xs font-medium tracking-[0.12em] uppercase"
                style={{ color: 'rgba(1, 180, 210, 0.6)' }}
              >
                Featured Insights
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 
              className="font-bold leading-[1.05] mb-3"
              style={{ 
                fontSize: 'clamp(24px, 4vw, 56px)',
                color: '#070643'
              }}
            >
              Stories of our transformations across{" "}
              <span 
                className="bg-gradient-to-r from-[#070643] to-[#5A83FF] bg-clip-text text-transparent"
              >
                Services and Industries
              </span>
            </h2>
            
            {/* Subheading */}
            <h5 
              className="text-base md:text-lg font-normal mb-4 md:mb-6"
              style={{ color: '#4A5568' }}
            >
              From Concept to Completion
            </h5>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-4 md:px-6 py-3 md:py-4 rounded-full font-medium text-white overflow-hidden text-sm md:text-base"
              style={{
                background: '#0A0045',
                boxShadow: '0 4px 20px rgba(10, 0, 69, 0.3)'
              }}
            >
              <span className="relative z-10">Explore More</span>
              <div className="absolute inset-0 bg-[#0B0050] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Right Column - Masonry Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient Panel Background */}
            <div 
              className="absolute inset-0 rounded-2xl p-4"
              style={{
                background: 'linear-gradient(180deg, rgba(90,131,255,0.04) 0%, rgba(1,180,210,0.05) 100%)',
                filter: 'blur(12px)'
              }}
            />
            
            {/* Cards Grid - Mobile: Single Column, Desktop: Triangle Structure */}
            <div className="relative">
              {/* Mobile: Single Column Layout */}
              <div className="block md:hidden space-y-4">
                {posts.slice(0, 6).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-[16px] cursor-pointer transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#070643] featured-insights-card h-48 w-full"
                    style={{
                      boxShadow: '0 20px 40px rgba(7,6,67,0.25), 0 8px 16px rgba(7,6,67,0.15)',
                      border: '1px solid rgba(7,6,67,0.12)'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={post.title}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Bottom Gradient Overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      {/* Title and Meta */}
                      <div className="space-y-2">
                        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                          <span className="text-white/90 text-xs font-medium">{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        boxShadow: '0 25px 50px rgba(7,6,67,0.35), 0 0 0 2px rgba(90,131,255,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070643]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[16px]" />
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Triangle Structure */}
              <div className="hidden md:block">
                {/* Row 1 - 2 cards */}
                <div className="flex justify-center gap-3 md:gap-4 lg:gap-5 mb-3 md:mb-4 lg:mb-5">
                {posts.slice(0, 2).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.12 }}
                    className="group relative overflow-hidden rounded-[16px] cursor-pointer transition-all duration-500 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#070643] featured-insights-card h-48 w-48 md:w-52 lg:w-56"
                    style={{
                      boxShadow: '0 20px 40px rgba(7,6,67,0.25), 0 8px 16px rgba(7,6,67,0.15)',
                      border: '1px solid rgba(7,6,67,0.12)'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={post.title}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Bottom Gradient Overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      {/* Title and Meta */}
                      <div className="space-y-2">
                        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                          <span className="text-white/90 text-xs font-medium">{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        boxShadow: '0 25px 50px rgba(7,6,67,0.35), 0 0 0 2px rgba(90,131,255,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070643]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[16px]" />
                  </motion.div>
                ))}
              </div>
              
              {/* Row 2 - 3 cards */}
              <div className="flex justify-center gap-3 md:gap-4 lg:gap-5 mb-3 md:mb-4 lg:mb-5">
                {posts.slice(2, 5).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 2) * 0.12 }}
                    className="group relative overflow-hidden rounded-[16px] cursor-pointer transition-all duration-500 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#070643] featured-insights-card h-48 w-48 md:w-52 lg:w-56"
                    style={{
                      boxShadow: '0 20px 40px rgba(7,6,67,0.25), 0 8px 16px rgba(7,6,67,0.15)',
                      border: '1px solid rgba(7,6,67,0.12)'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={post.title}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Bottom Gradient Overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      {/* Title and Meta */}
                      <div className="space-y-2">
                        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                          <span className="text-white/90 text-xs font-medium">{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        boxShadow: '0 25px 50px rgba(7,6,67,0.35), 0 0 0 2px rgba(90,131,255,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070643]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[16px]" />
                  </motion.div>
          ))}
        </div>
              
              {/* Row 3 - 4 cards */}
              <div className="flex justify-center gap-3 md:gap-4 lg:gap-5">
                {posts.slice(5, 9).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 5) * 0.12 }}
                    className="group relative overflow-hidden rounded-[16px] cursor-pointer transition-all duration-500 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#070643] featured-insights-card h-48 w-48 md:w-52 lg:w-56"
                    style={{
                      boxShadow: '0 20px 40px rgba(7,6,67,0.25), 0 8px 16px rgba(7,6,67,0.15)',
                      border: '1px solid rgba(7,6,67,0.12)'
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={post.title}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Bottom Gradient Overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      {/* Title and Meta */}
                      <div className="space-y-2">
                        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                          <span className="text-white/90 text-xs font-medium">{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        boxShadow: '0 25px 50px rgba(7,6,67,0.35), 0 0 0 2px rgba(90,131,255,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070643]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[16px]" />
                  </motion.div>
                ))}
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


