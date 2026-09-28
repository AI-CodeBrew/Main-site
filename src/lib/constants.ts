import { NavItem, NavDropdownItem, CountryOption } from "@/types";

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/ai-automation", label: "AI Automation" },
  { href: "/ecommerce", label: "Ecommerce" },
  { 
    label: "What We Are", 
    dropdown: [
      { href: "/about", label: "About us" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/blog", label: "Blogs" }
    ] as NavDropdownItem[]
  },
  { href: "/team", label: "Team" },
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
