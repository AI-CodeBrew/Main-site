import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Operations & Automation",
  description: "Streamline your e-commerce operations with AI-powered automation and intelligent workflows. From inventory management to customer support, automate repetitive tasks and focus on growing your business.",
  image: "/Business-Cards/Operations & Automation(AI + Workflow + Support).png",
  category: "ecommerce" as const
};

const overview = {
  title: "AI-Powered Operations Automation",
  description: "Transform your e-commerce operations with intelligent automation that handles routine tasks, optimizes workflows, and provides 24/7 support. Our AI-powered solutions scale with your business while reducing costs and improving efficiency.",
  features: [
    "AI-powered customer support chatbots",
    "Automated inventory and order management",
    "Workflow automation and integration",
    "Intelligent fulfillment and shipping",
    "Automated reporting and analytics",
    "CRM integration and lead management"
  ],
  image: "/Business-Cards/Operations & Automation(AI + Workflow + Support)2.png",
  imageAlt: "Operations and Automation Solutions"
};

const details = {
  title: "Comprehensive Operations Automation",
  description: "Our Operations & Automation service combines AI, workflow automation, and intelligent systems to create a fully automated e-commerce operation that runs efficiently and scales with your business growth.",
  sections: [
    {
      title: "AI Customer Support & Chatbots",
      description: "Implement intelligent customer support systems that provide instant, accurate responses to customer queries while seamlessly escalating complex issues to human agents when needed.",
      features: [
        "AI-powered chatbot development",
        "Natural language processing integration",
        "Multi-channel support automation",
        "Ticket routing and prioritization",
        "Knowledge base automation",
        "Sentiment analysis and response optimization"
      ]
    },
    {
      title: "Inventory & Order Management",
      description: "Automate your entire inventory and order management process with intelligent systems that predict demand, manage stock levels, and optimize fulfillment operations.",
      features: [
        "Automated inventory tracking and alerts",
        "Demand forecasting and planning",
        "Order processing and fulfillment automation",
        "Supplier management and reordering",
        "Returns and refund processing",
        "Multi-channel inventory synchronization"
      ]
    },
    {
      title: "Workflow & Integration Automation",
      description: "Connect and automate all your business systems with intelligent workflows that eliminate manual tasks and ensure data consistency across all platforms.",
      features: [
        "Zapier and Make.com integration",
        "Custom workflow development",
        "API integration and data synchronization",
        "Automated reporting and notifications",
        "CRM and marketing automation",
        "Third-party service integration"
      ]
    }
  ]
};

export default function OperationsAutomationPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
