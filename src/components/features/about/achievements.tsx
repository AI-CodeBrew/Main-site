"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    number: "500+",
    label: "Successful Projects",
    description: "Delivered innovative solutions across industries"
  },
  {
    number: "250+",
    label: "Active Clients",
    description: "Trusted by leading companies worldwide"
  },
  {
    number: "20+",
    label: "Countries Supported",
    description: "Global presence with local expertise"
  },
  {
    number: "8+",
    label: "Years of Experience",
    description: "Proven track record of excellence"
  }
];

export function Achievements() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
      
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--heading)' }}>
            FynkTech's Achievements
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            We take pride in empowering businesses worldwide with innovative solutions. 
            FynkTech brings an unwavering commitment to excellence, backed by a global presence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="mb-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#070643] to-[#5A83FF] mb-2"
                >
                  {achievement.number}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--heading)' }}>{achievement.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn btn-primary text-lg px-8 py-4">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
