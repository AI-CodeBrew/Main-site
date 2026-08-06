"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  // Responsive: show 1 card on small screens, 3 on md+
  useEffect(() => {
    const compute = () => setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  const clients = [
    {
      name: "Abdulrahman Al-Mansouri",
      title: "CEO, Riyadh Tech Solutions",
      company: "Riyadh Tech Solutions",
      quote: "Fynk Tech transformed our entire operation. Their AI automation solutions increased our efficiency by 70% in just 6 weeks. The ROI was immediate and substantial.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      results: "70% efficiency increase"
    },
    {
      name: "Ahmed Al-Rashid",
      title: "Founder, E-commerce Solutions",
      company: "E-commerce Solutions",
      quote: "Our online store conversion rate increased by 22% after implementing Fynk's e-commerce solutions. The team's expertise in the MENA market is unmatched.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      results: "22% conversion increase"
    },
    {
      name: "Priya Sharma",
      title: "CTO, Digital Innovations",
      company: "Digital Innovations",
      quote: "The speed from MVP to market was incredible. Fynk's development team delivered our mobile app 3 weeks ahead of schedule with zero bugs.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      results: "3 weeks ahead of schedule"
    },
    {
      name: "Michael Chen",
      title: "Operations Director, Global Corp",
      company: "Global Corp",
      quote: "Their AI-powered workflow automation saved us 40 hours per week. The system is so intuitive that our team adopted it within days.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      results: "40 hours saved weekly"
    },
    {
      name: "Fatima Al-Zahra",
      title: "Marketing Manager, Retail Plus",
      company: "Retail Plus",
      quote: "Fynk's AI marketing automation increased our lead generation by 150%. The personalized campaigns they created are driving real business growth.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      results: "150% lead increase"
    },
    {
      name: "David Thompson",
      title: "Founder, SaaS Platform",
      company: "SaaS Platform",
      quote: "The cloud infrastructure Fynk built for us is rock-solid. We've had 99.9% uptime since launch, and their support team is always responsive.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      rating: 5,
      results: "99.9% uptime"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, clients.length - itemsPerView));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Touch swipe handlers for mobile (itemsPerView === 1)
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (itemsPerView !== 1) return;
    setIsDragging(true);
    setDragDeltaX(0);
    // store start X in a dataset on the element
    const startX = e.touches[0].clientX;
    (e.currentTarget as any)._startX = startX;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging || itemsPerView !== 1) return;
    const startX = (e.currentTarget as any)._startX ?? e.touches[0].clientX;
    const delta = e.touches[0].clientX - startX;
    setDragDeltaX(delta);
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (itemsPerView !== 1) return;
    const threshold = 50; // px
    if (dragDeltaX > threshold) {
      prevSlide();
    } else if (dragDeltaX < -threshold) {
      nextSlide();
    }
    setIsDragging(false);
    setDragDeltaX(0);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied clients who have transformed their businesses with our AI automation and e-commerce solutions.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
              currentSlide === 0 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-white hover:shadow-xl'
            }`}
            aria-label="Previous testimonials"
            style={{ display: itemsPerView === 1 ? 'none' : undefined }}
          >
            <svg className={`w-6 h-6 transition-colors ${
              currentSlide === 0 
                ? 'text-gray-400' 
                : 'text-gray-600 group-hover:text-[#0A0045]'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide >= clients.length - itemsPerView}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group hover:scale-110 ${
              currentSlide >= clients.length - itemsPerView 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-white hover:shadow-xl'
            }`}
            aria-label="Next testimonials"
            style={{ display: itemsPerView === 1 ? 'none' : undefined }}
          >
            <svg className={`w-6 h-6 transition-colors ${
              currentSlide >= clients.length - itemsPerView 
                ? 'text-gray-400' 
                : 'text-gray-600 group-hover:text-[#0A0045]'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={isDragging ? undefined : { x: -currentSlide * (100 / itemsPerView) + '%' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={itemsPerView === 1 && isDragging ? { transform: `translateX(calc(${-currentSlide * (100 / itemsPerView)}% + ${dragDeltaX}px))` } : undefined}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={client.name}
                  className="flex-shrink-0 w-full md:w-1/3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    {/* Client Image and Info */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                        <Image
                          src={client.image}
                          alt={client.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{client.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{client.title}</p>
                      <p className="text-xs text-gray-500">{client.company}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center mb-4">
                      {[...Array(client.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-gray-700 mb-6 leading-relaxed text-center">
                      "{client.quote}"
                    </blockquote>

                    {/* Results Badge */}
                    <div className="flex justify-center">
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white text-xs font-medium rounded-full">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {client.results}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: clients.length - (itemsPerView - 1) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#0A0045] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonials ${index + 1}-${index + itemsPerView}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to join our success stories?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0A0045] to-[#1a1a2e] text-white font-semibold rounded-lg hover:from-[#070643] hover:to-[#16213e] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Start Your Success Story
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}


