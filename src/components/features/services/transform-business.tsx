"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, ShoppingCart, Smartphone, Users, ChevronDown, Database, Cloud, Shield, Globe, Zap, Code, MessageSquare, Workflow, TrendingUp, Bot, Palette, Wrench } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const aiAutomationServices = [
  {
    icon: MessageSquare,
    title: "AI Voice & Chat Automation",
    description: "Intelligent conversational AI for customer support",
    image: "/Business-Cards/AI Voice & Chat Automation.png"
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    description: "Streamline operations with intelligent automation",
    image: "/Business-Cards/Business Workflow Automation.png"
  },
  {
    icon: TrendingUp,
    title: "AI Sales & Marketing Automation",
    description: "AI-powered sales and marketing solutions",
    image: "/Business-Cards/AI Sales & Marketing Automation.avif"
  },
  {
    icon: Database,
    title: "Data, Analytics & AI Insight Systems",
    description: "Transform data into actionable business insights",
    image: "/Business-Cards/Data Analytics & Scaling Roadmaps.png"
  },
  {
    icon: Bot,
    title: "Custom AI Agent Development",
    description: "Tailored AI agents for your specific needs",
    image: "/Business-Cards/Custom AI Agent Development.webp"
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern web applications and platforms",
    image: "/Business-Cards/webdevelopment.png"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications",
    image: "/Business-Cards/mobiledevelopment.avif"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user experiences",
    image: "/Business-Cards/UI-UXDesign.png"
  },
  {
    icon: Cloud,
    title: "Cloud Application",
    description: "Scalable cloud-based solutions",
    image: "/Business-Cards/Cloud Application.png"
  },
  {
    icon: Wrench,
    title: "Quality Assurance, Maintenance & Support",
    description: "Comprehensive QA and ongoing support services",
    image: "/Business-Cards/quality-control.png"
  }
];

const ecommerceServices = [
  {
    icon: ShoppingCart,
    title: "Store Setup & Development (Shopify / Woo / Custom)",
    description: "Complete e-commerce store development and setup",
    image: "/Business-Cards/StoreSetup&Development.png"
  },
  {
    icon: Database,
    title: "Product Sourcing & Supply Chain Management",
    description: "End-to-end product sourcing and supply chain solutions",
    image: "/Business-Cards/Product Sourcing & Supply Chain Management.png"
  },
  {
    icon: TrendingUp,
    title: "Marketing & Growth Systems",
    description: "Data-driven marketing and growth strategies",
    image: "/Business-Cards/Marketing & Growth Systems.png"
  },
  {
    icon: Zap,
    title: "Sales Funnel Optimization",
    description: "Optimize your sales funnel for maximum conversions",
    image: "/Business-Cards/SalesFunnelOptimization.png"
  },
  {
    icon: Workflow,
    title: "Operations & Automation (AI + Workflow + Support)",
    description: "Streamline operations with AI and automation",
    image: "/Business-Cards/Operations & Automation(AI + Workflow + Support).png"
  },
  {
    icon: Database,
    title: "Data Analytics & Scaling Roadmaps",
    description: "Comprehensive analytics and scaling strategies",
    image: "/Business-Cards/Data Analytics & Scaling Roadmaps.png"
  },
  {
    icon: Palette,
    title: "Branding & Creative Production",
    description: "Complete branding and creative design services",
    image: "/Business-Cards/Branding & Creative Production.png"
  },
  {
    icon: Wrench,
    title: "Maintenance & Long-Term Store Management",
    description: "Ongoing maintenance and store management services",
    image: "/Business-Cards/Maintenance &Long-TermStore Management.png"
  },
  {
    icon: Bot,
    title: "AI for E-commerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation)",
    description: "AI-powered e-commerce solutions and automation",
    image: "/Business-Cards/AI for eCommerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation).png"
  }
];

export function TransformBusiness() {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  
  const displayedAIServices = showAll ? aiAutomationServices : aiAutomationServices.slice(0, 4);
  const displayedEcommerceServices = showAll ? ecommerceServices : ecommerceServices.slice(0, 4);

  // Create service route mapping
  const getServiceRoute = (title: string, category: 'ai' | 'ecommerce') => {
    const routeMap: { [key: string]: string } = {
      // AI Automation routes
      'AI Voice & Chat Automation': '/ai-automation/voice-chat',
      'Business Workflow Automation': '/ai-automation/workflow',
      'AI Sales & Marketing Automation': '/ai-automation/sales-marketing',
      'Data, Analytics & AI Insight Systems': '/ai-automation/data-analytics',
      'Custom AI Agent Development': '/ai-automation/custom-agents',
      'Web Development': '/ai-automation/web-development',
      'Mobile App Development': '/ai-automation/mobile-development',
      'UI/UX Design': '/ai-automation/ui-ux',
      'Cloud Application': '/ai-automation/cloud',
      'Quality Assurance, Maintenance & Support': '/ai-automation/qa-support',
      
      // Ecommerce routes
      'Store Setup & Development (Shopify / Woo / Custom)': '/ecommerce/store-setup',
      'Product Sourcing & Supply Chain Management': '/ecommerce/product-sourcing',
      'Marketing & Growth Systems': '/ecommerce/marketing-growth',
      'Sales Funnel Optimization': '/ecommerce/sales-funnel',
      'Operations & Automation (AI + Workflow + Support)': '/ecommerce/operations-automation',
      'Data Analytics & Scaling Roadmaps': '/ecommerce/data-analytics',
      'Branding & Creative Production': '/ecommerce/branding-creative',
      'Maintenance & Long-Term Store Management': '/ecommerce/maintenance',
      'AI for E-commerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation)': '/ecommerce/ai-solutions'
    };
    
    return routeMap[title] || '#';
  };

  const handleServiceClick = (title: string, category: 'ai' | 'ecommerce') => {
    const route = getServiceRoute(title, category);
    if (route !== '#') {
      router.push(route);
    }
  };

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
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          style={{ color: '#80DFFF' }}
        >
          Transform Your Business
        </motion.h2>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* AI Automation Column */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: '#80DFFF' }}
            >
              AI Automation
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {displayedAIServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl enhanced-card h-64 cursor-pointer"
                    onClick={() => handleServiceClick(service.title, 'ai')}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {/* Enhanced overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-center text-center text-white">
                      <h3 className="text-lg font-semibold mb-2 drop-shadow-lg">{service.title}</h3>
                      <p className="text-sm leading-relaxed opacity-95 drop-shadow-md">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0045]/30 to-[#1a1a2e]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* Ecommerce Column */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: '#80DFFF' }}
            >
              E-commerce
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {displayedEcommerceServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl enhanced-card h-64 cursor-pointer"
                    onClick={() => handleServiceClick(service.title, 'ecommerce')}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {/* Enhanced overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-center text-center text-white">
                      <h3 className="text-lg font-semibold mb-2 drop-shadow-lg">{service.title}</h3>
                      <p className="text-sm leading-relaxed opacity-95 drop-shadow-md">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0045]/30 to-[#1a1a2e]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Single More Services Button */}
        <div className="text-center mt-16">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#0A0045',
              color: 'white'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? "View Less Services" : "More Services"}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
