"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container-page relative">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="text-left mb-5">
              <h2 className="text-4xl md:text-6xl lg:text-7xl" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                <span className="font-normal" style={{ color: '#0A0A3C' }}>Our </span>
                <span style={{ color: '#1E3296' }}>Mission</span>
              </h2>
            </div>
            
            <div className="py-6 md:py-12"></div>
            
            <div className="bg-white shadow-sm relative px-4 py-8 md:px-12 md:py-16 lg:px-[5em] lg:py-[8em]" style={{ border: '2px solid #8b8b8b4d', borderRadius: '1.5em' }}>
              {/* Quote icon badge */}
              <div className="absolute -top-6 -right-4 md:-top-8 md:-right-6 lg:-top-12 lg:-right-8 w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 bg-gradient-to-r from-[#0A0A3C] to-[#1E3296] rounded-full flex items-center justify-center" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                <svg className="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <p className="text-slate-700 text-left text-sm md:text-base lg:text-xl" style={{ display: 'block', marginBlockStart: '1em', marginBlockEnd: '1em', marginInlineStart: 0, marginInlineEnd: 0, unicodeBidi: 'isolate', lineHeight: 1.5 }}>
                To empower businesses with cutting-edge AI automation and e-commerce solutions, 
                unlocking their growth potential by connecting them with passionate and skilled 
                engineers who deliver exceptional results.
              </p>
            </div>
            
            <div style={{ paddingTop: '7vh', paddingBottom: '7vh' }}></div>
          </motion.div>

          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="text-left mb-5">
              <h2 className="text-4xl md:text-6xl lg:text-7xl" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                <span className="font-normal" style={{ color: '#0A0A3C' }}>Our </span>
                <span style={{ color: '#1E3296' }}>Vision</span>
              </h2>
            </div>
            
            <div className="py-6 md:py-12"></div>
            
            <div className="bg-white shadow-sm relative px-4 py-8 md:px-12 md:py-16 lg:px-[5em] lg:py-[8em]" style={{ border: '2px solid #8b8b8b4d', borderRadius: '1.5em' }}>
              {/* Quote icon badge */}
              <div className="absolute -top-6 -right-4 md:-top-8 md:-right-6 lg:-top-12 lg:-right-8 w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 bg-gradient-to-r from-[#0A0A3C] to-[#1E3296] rounded-full flex items-center justify-center" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                <svg className="w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <p className="text-slate-700 text-left text-sm md:text-base lg:text-xl" style={{ display: 'block', marginBlockStart: '1em', marginBlockEnd: '1em', marginInlineStart: 0, marginInlineEnd: 0, unicodeBidi: 'isolate', lineHeight: 1.5 }}>
                To be the global leader in AI automation and e-commerce innovation, creating 
                a world where every business can leverage advanced technology to achieve 
                unprecedented growth and success.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


