import { NavItem, NavDropdownItem, CountryOption } from "@/types";

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { 
    label: "AI Automation", 
    dropdown: [
      { href: "/ai-automation/voice-chat", label: "AI Voice & Chat Automation" },
      { href: "/ai-automation/workflow", label: "Business Workflow Automation" },
      { href: "/ai-automation/sales-marketing", label: "AI Sales & Marketing Automation" },
      { href: "/ai-automation/data-analytics", label: "Data, Analytics & AI Insight Systems" },
      { href: "/ai-automation/custom-agents", label: "Custom AI Agent Development" },
      { href: "/ai-automation/web-development", label: "Web Development" },
      { href: "/ai-automation/mobile-development", label: "Mobile App Development" },
      { href: "/ai-automation/ui-ux", label: "UI/UX Design" },
      { href: "/ai-automation/cloud", label: "Cloud Application" },
      { href: "/ai-automation/qa-support", label: "Quality Assurance, Maintenance & Support" }
    ] as NavDropdownItem[]
  },
  { 
    label: "Ecommerce", 
    dropdown: [
      { href: "/ecommerce/store-setup", label: "Store Setup & Development (Shopify / Woo / Custom)" },
      { href: "/ecommerce/product-sourcing", label: "Product Sourcing & Supply Chain Management" },
      { href: "/ecommerce/marketing-growth", label: "Marketing & Growth Systems" },
      { href: "/ecommerce/sales-funnel", label: "Sales Funnel Optimization" },
      { href: "/ecommerce/operations-automation", label: "Operations & Automation (AI + Workflow + Support)" },
      { href: "/ecommerce/data-analytics", label: "Data Analytics & Scaling Roadmaps" },
      { href: "/ecommerce/branding-creative", label: "Branding & Creative Production" },
      { href: "/ecommerce/maintenance", label: "Maintenance & Long-Term Store Management" },
      { href: "/ecommerce/ai-solutions", label: "AI for eCommerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation)" }
    ] as NavDropdownItem[]
  },
  { 
    label: "What We Are", 
    dropdown: [
      { href: "/about", label: "About us" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/blog", label: "Blogs" }
    ] as NavDropdownItem[]
  },
  { href: "/contact", label: "Contact" },
];

export const countryOptions: CountryOption[] = [
  { value: "global", label: "Global" },
  { value: "mena", label: "MENA" },
  { value: "ksa-en", label: "KSA & Gulf" },
  { value: "america", label: "USA" },
  { value: "europe-uk", label: "Europe & UK" },
];

export const services = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Intelligent automation solutions that streamline your business processes",
    features: ["Process Automation", "Intelligent Agents", "Workflow Optimization"]
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Full-stack e-commerce platforms that drive growth and engagement",
    features: ["Custom Development", "Platform Integration", "Performance Optimization"]
  }
];

export const industries = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Digital transformation for healthcare organizations",
    services: ["Patient Management", "Telemedicine", "Data Analytics"]
  },
  {
    id: "fintech",
    name: "Fintech",
    description: "Innovative financial technology solutions",
    services: ["Payment Systems", "Risk Management", "Compliance"]
  },
  {
    id: "retail",
    name: "Retail & CPG",
    description: "E-commerce and retail technology solutions",
    services: ["Online Stores", "Inventory Management", "Customer Analytics"]
  },
  {
    id: "startups",
    name: "Startups",
    description: "Scalable technology solutions for growing businesses",
    services: ["MVP Development", "Technical Consulting", "Growth Hacking"]
  }
];
