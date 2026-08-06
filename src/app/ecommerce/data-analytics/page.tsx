import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Data Analytics & Scaling Roadmaps",
  description: "Make data-driven decisions with comprehensive analytics and scaling strategies. From performance dashboards to growth roadmaps, we help you understand your business and plan for sustainable growth.",
  image: "/Business-Cards/Data Analytics & Scaling Roadmaps.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Intelligent Analytics & Growth Planning",
  description: "Transform your e-commerce data into actionable insights with comprehensive analytics solutions and strategic scaling roadmaps. Our data-driven approach helps you understand performance, identify opportunities, and plan for sustainable business growth.",
  features: [
    "Custom analytics dashboards and reporting",
    "AI-powered sales forecasting and insights",
    "Marketing ROI tracking and optimization",
    "Product performance analysis and recommendations",
    "Competitor analysis and market insights",
    "Strategic scaling roadmap development"
  ],
  image: "/Business-Cards/Data Analytics & Scaling Roadmaps2.png",
  imageAlt: "Data Analytics and Scaling Roadmaps"
};

const details = {
  title: "Comprehensive Analytics & Growth Services",
  description: "Our Data Analytics & Scaling Roadmaps service provides end-to-end analytics solutions that transform raw data into strategic insights and actionable growth plans for sustainable e-commerce success.",
  sections: [
    {
      title: "Advanced Analytics & Reporting",
      description: "Create comprehensive analytics systems that provide real-time insights into your business performance, customer behavior, and market trends.",
      features: [
        "Custom dashboard development",
        "Real-time KPI monitoring",
        "Customer behavior analysis",
        "Sales performance tracking",
        "Marketing attribution analysis",
        "Automated reporting and alerts"
      ]
    },
    {
      title: "AI-Powered Insights & Forecasting",
      description: "Leverage artificial intelligence and machine learning to predict trends, forecast sales, and generate actionable insights that drive business growth.",
      features: [
        "Sales forecasting and prediction models",
        "Customer lifetime value analysis",
        "Demand forecasting and inventory planning",
        "Churn prediction and retention strategies",
        "Price optimization recommendations",
        "Market trend analysis and insights"
      ]
    },
    {
      title: "Strategic Scaling & Growth Planning",
      description: "Develop comprehensive scaling roadmaps and growth strategies based on data insights to ensure sustainable business expansion and market success.",
      features: [
        "Growth opportunity identification",
        "Market expansion strategies",
        "Resource allocation optimization",
        "Competitive analysis and positioning",
        "Risk assessment and mitigation planning",
        "Long-term strategic roadmap development"
      ]
    }
  ]
};

export default function DataAnalyticsPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
