"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function FynkBot() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] h-[calc(100vh-8rem)] max-h-[500px] md:w-[380px] md:h-[500px] bg-surface rounded-2xl shadow-2xl border border-line overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] p-3 md:p-4 flex items-center gap-2 md:gap-3 relative">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                <Image
                  src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
                  alt="FynkTech Bot"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base md:text-lg">FynkTech Bot</h3>
                <p className="text-white/70 text-xs md:text-sm">AI Assistant</p>
              </div>
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors duration-200 p-1 hover:bg-white/10 rounded-lg"
                aria-label="Close Chat"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-3 md:p-4 h-[calc(100%-140px)] md:h-[320px] overflow-y-auto bg-surface-muted">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface rounded-2xl p-3 md:p-4 shadow-sm border border-line"
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs md:text-sm font-bold">F</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-heading text-xs md:text-sm leading-relaxed">
                      Hi! I'm FynkTech Bot, your AI assistant. I can help you with questions about AI automation, e-commerce solutions, and our services. How can I assist you today?
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-surface border-t border-line h-[100px] md:h-[120px] flex flex-col justify-center">
              <div className="flex gap-2 md:gap-3">
                <input
                  placeholder="Type your message..."
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-[#0A0045]/20 focus:border-[#0A0045] transition-all duration-200 text-xs md:text-sm bg-surface-muted"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        aria-label="Open Chat"
        className="w-14 h-14 md:w-16 md:h-16 rounded-full hover:shadow-2xl transition-all duration-300 flex items-center justify-center relative overflow-hidden origin-bottom-right"
        style={{ transformOrigin: 'bottom right' }}
        onClick={() => !open && setOpen(true)}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
          <Image
            src="/DARK%20BLUE%20Fynk%20Tech%20CMYK%20JPEG%20files-05.jpg"
            alt="FynkTech Bot"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </div>
  );
}


