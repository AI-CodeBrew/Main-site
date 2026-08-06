import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Store Setup & Development",
  description: "Launch your e-commerce store from scratch with our comprehensive setup and development services. From Shopify to WooCommerce and custom solutions, we build stores that convert visitors into customers.",
  image: "/Business-Cards/StoreSetup&Development.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Complete E-commerce Store Solutions",
  description: "Transform your business idea into a fully functional, high-converting e-commerce store. Our comprehensive setup and development services cover everything from platform selection to custom development, ensuring your store is optimized for success from day one.",
  features: [
    "Shopify, WooCommerce, and custom store development",
    "Custom theme design optimized for conversions",
    "Product and category page setup",
    "Payment gateway and shipping integration",
    "App integration and third-party services",
    "Domain setup and SSL configuration"
  ],
  image: "/Business-Cards/StoreSetup&Development2.png",
  imageAlt: "E-commerce Store Setup and Development"
};

const details = {
  title: "Comprehensive Store Development Services",
  description: "Our Store Setup & Development service provides end-to-end e-commerce solutions that combine technical excellence with conversion optimization to create stores that drive sales and grow your business.",
  sections: [
    {
      title: "Platform Selection & Setup",
      description: "Choose the right e-commerce platform for your business needs and set up a robust foundation that can scale with your growth.",
      features: [
        "Platform comparison and recommendation",
        "Shopify store setup and configuration",
        "WooCommerce installation and customization",
        "Custom e-commerce platform development",
        "Multi-platform integration strategies",
        "Migration from existing platforms"
      ]
    },
    {
      title: "Design & User Experience",
      description: "Create stunning, conversion-optimized store designs that provide exceptional user experiences and drive sales.",
      features: [
        "Custom theme design and development",
        "Mobile-first responsive design",
        "UX/UI optimization for conversions",
        "Brand integration and customization",
        "Product page optimization",
        "Checkout flow optimization"
      ]
    },
    {
      title: "Integration & Configuration",
      description: "Integrate essential e-commerce tools and services to create a complete, functional store that handles all aspects of online selling.",
      features: [
        "Payment gateway integration (Stripe, PayPal, etc.)",
        "Shipping and fulfillment setup",
        "Inventory management integration",
        "Email marketing platform connection",
        "Analytics and tracking setup",
        "Security and compliance implementation"
      ]
    }
  ]
};

export default function StoreSetupPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
