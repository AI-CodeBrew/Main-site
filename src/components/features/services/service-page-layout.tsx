"use client";

import { ServiceHero } from "./service-hero";
import { ServiceOverview } from "./service-overview";
import { ServiceDetails } from "./service-details";
import { TechStackAI } from "../common/tech-stack-ai";
import { TechStackEcommerce } from "../common/tech-stack-ecommerce";
import { CaseStudies } from "../contact/case-studies";
import { Achievements } from "../about/achievements";
import { Contact } from "../contact/contact";

interface ServicePageLayoutProps {
  hero: {
    title: string;
    description: string;
    image: string;
    category: "ai" | "ecommerce";
  };
  overview: {
    title: string;
    description: string;
    features: string[];
    image: string;
    imageAlt: string;
  };
  details: {
    title: string;
    description: string;
    sections: {
      title: string;
      description: string;
      features: string[];
    }[];
  };
}

export function ServicePageLayout({ hero, overview, details }: ServicePageLayoutProps) {
  return (
    <main className="min-h-screen">
      <ServiceHero {...hero} />
      <ServiceOverview {...overview} />
      <ServiceDetails {...details} />
      {hero.category === "ai" ? <TechStackAI /> : <TechStackEcommerce />}
      <CaseStudies />
      <Achievements />
      <Contact />
    </main>
  );
}
