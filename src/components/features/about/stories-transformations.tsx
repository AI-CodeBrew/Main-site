"use client";

import { motion } from "framer-motion";

const stories = [
  {
    title: "AI-Powered E-commerce Platform",
    category: "Case Study",
    description: "Scaled to 100K monthly transactions with AI automation",
    image: "🏪",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Healthcare AI Platform",
    category: "Case Study", 
    description: "Reconciled $300M+ in OTA commissions automatically",
    image: "🏥",
    gradient: "from-green-500 to-teal-600"
  },
  {
    title: "Fintech AI Solutions",
    category: "Case Study",
    description: "Secured $2M+ funding with AI financial modeling",
    image: "💳",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    title: "Retail Automation",
    category: "Case Study",
    description: "Drove 55% growth with Shopify migration",
    image: "🛍️",
    gradient: "from-pink-500 to-red-600"
  },
  {
    title: "AI Data Analytics",
    category: "Case Study",
    description: "Transformed business operations with AI insights",
    image: "📊",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    title: "Mobile App Development",
    category: "Case Study",
    description: "Launched successful cross-platform applications",
    image: "📱",
    gradient: "from-purple-500 to-pink-600"
  }
];

export function StoriesTransformations() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#070643]/5 to-transparent" />
      
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Stories of our transformations across Services and Industries
          </h2>
          <p className="text-xl mb-8" style={{ color: 'var(--muted-foreground)' }}>From Concept to Completion</p>
          <a href="/case-studies" className="btn btn-primary text-lg px-8 py-4">
            Explore More
          </a>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg light-theme-shadow"
              style={{ 
                backgroundColor: 'var(--card)', 
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="relative p-8 h-full flex flex-col">
                <div className="text-6xl mb-4 text-center">{story.image}</div>
                <div className="text-sm text-[#070643] font-medium mb-2">{story.category}</div>
                <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                <p className="text-sm leading-relaxed flex-grow" style={{ color: 'var(--muted-foreground)' }}>
                  {story.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#070643] text-sm font-medium">Read More →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
