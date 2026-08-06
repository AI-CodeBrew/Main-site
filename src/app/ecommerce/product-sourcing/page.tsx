import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Product Sourcing & Supply Chain Management",
  description: "Leverage our China sourcing expertise to find, evaluate, and manage suppliers for your e-commerce business. From product research to quality control and logistics, we handle your entire supply chain.",
  image: "/Business-Cards/Product Sourcing & Supply Chain Management.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Comprehensive Supply Chain Solutions",
  description: "Transform your product sourcing and supply chain management with our China-based expertise and global network. We help you find winning products, reliable suppliers, and optimize your entire supply chain for maximum profitability and efficiency.",
  features: [
    "Product research and trend analysis",
    "Supplier sourcing and evaluation",
    "Quality control and sample handling",
    "Negotiation and vendor management",
    "Shipping and logistics coordination",
    "Import documentation and compliance"
  ],
  image: "/Business-Cards/Product Sourcing & Supply Chain Management2.png",
  imageAlt: "Product Sourcing and Supply Chain Management"
};

const details = {
  title: "End-to-End Supply Chain Management",
  description: "Our Product Sourcing & Supply Chain Management service provides comprehensive solutions that cover every aspect of sourcing, from initial product research to final delivery, ensuring quality, reliability, and cost-effectiveness.",
  sections: [
    {
      title: "Product Research & Analysis",
      description: "Identify winning products and market opportunities using advanced research tools and market analysis to ensure your product selection drives sales and profitability.",
      features: [
        "Market trend analysis and forecasting",
        "Competitor research and pricing analysis",
        "Product demand and seasonality assessment",
        "Profit margin calculation and optimization",
        "Niche market identification",
        "Product validation and testing"
      ]
    },
    {
      title: "Supplier Sourcing & Management",
      description: "Find and manage reliable suppliers through our extensive network and proven evaluation processes, ensuring quality, reliability, and competitive pricing.",
      features: [
        "Supplier identification and verification",
        "Factory audits and quality assessments",
        "Price negotiation and contract management",
        "Supplier relationship management",
        "Alternative supplier development",
        "Risk assessment and mitigation"
      ]
    },
    {
      title: "Quality Control & Logistics",
      description: "Ensure product quality and smooth logistics operations with comprehensive quality control processes and efficient shipping and fulfillment solutions.",
      features: [
        "Pre-production quality control",
        "In-production monitoring and inspection",
        "Final quality inspection and approval",
        "Packaging and branding coordination",
        "Shipping and logistics management",
        "Import documentation and customs clearance"
      ]
    }
  ]
};

export default function ProductSourcingPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
