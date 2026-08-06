"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const leaders = [
  {
    name: "Zubair Khawar",
    title: "Founder, CEO",
    image: "👨‍💼"
  },
  {
    name: "Sarah Johnson",
    title: "Chief Technology Officer",
    image: "👩‍💻"
  },
  {
    name: "Michael Chen",
    title: "Chief Operating Officer",
    image: "👨‍💼"
  },
  {
    name: "Emily Rodriguez",
    title: "Head of AI Research",
    image: "👩‍🔬"
  },
  {
    name: "David Thompson",
    title: "VP of E-commerce",
    image: "👨‍💼"
  },
  {
    name: "Lisa Wang",
    title: "Head of Global Operations",
    image: "👩‍💼"
  }
];

export function GlobalLeadership() {
  return (
    <section className="py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
            Our Global Leadership
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Meet the visionary leaders driving innovation and excellence at Fynk Tech
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#5A83FF] to-[#01B4D2] flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                  {leader.image}
                </div>
                <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                  {leader.name}
                </h3>
                <p className="mb-3" style={{ color: 'var(--muted-foreground)' }}>
                  {leader.title}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#5A83FF] hover:text-white transition-colors duration-300"
                  style={{ backgroundColor: 'var(--muted)' }}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
