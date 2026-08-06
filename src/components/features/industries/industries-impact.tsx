"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Building2, 
  Phone, 
  ShoppingBag, 
  Fuel, 
  Rocket, 
  CreditCard, 
  Heart, 
  Gamepad2
} from "lucide-react";

const industries = [
  { icon: Globe, name: "Travel & Hospitality" },
  { icon: Phone, name: "Telecommunication" },
  { icon: Fuel, name: "Oil, Gas and Energy" },
  { icon: ShoppingBag, name: "E-commerce" },
  { icon: Heart, name: "Healthcare & Pharmaceuticals" },
  { icon: Building2, name: "Public Sector" },
  { icon: ShoppingBag, name: "Retail & CPG" },
  { icon: Rocket, name: "Startups" },
  { icon: CreditCard, name: "Banking & Fintech" },
  { icon: Gamepad2, name: "Gaming" }
];

export function IndustriesImpact() {
  // Split industries into two columns
  const leftColumn = industries.slice(0, 5);
  const rightColumn = industries.slice(5);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dark Blue-Purple Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0A0A3C 0%, #1E3296 30%, #2A2A6A 70%, #0A0A3C 100%)'
        }}
      />
      
      {/* Subtle overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(30, 50, 150, 0.3) 0%, transparent 60%)',
          filter: 'blur(1px)'
        }}
      />
      
      <div className="container-page relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ color: '#80DFFF' }}
        >
          Discover our Impact Across Industries
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-0">
              {leftColumn.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center gap-4 py-4 border-b border-white/20 last:border-b-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <industry.icon className="w-6 h-6" style={{ color: '#80DFFF' }} />
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                    {industry.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-0">
              {rightColumn.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (index + 5) * 0.1 }}
                  className="group flex items-center gap-4 py-4 border-b border-white/20 last:border-b-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <industry.icon className="w-6 h-6" style={{ color: '#80DFFF' }} />
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                    {industry.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
