// Common types used across the application

export interface NavItem {
  href?: string;
  label: string;
  dropdown?: NavItem[];
}

export interface NavDropdownItem {
  href: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon?: string;
  services?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  services: string[];
  results: string[];
  image?: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  slug: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  budget?: string;
  timeline?: string;
}
