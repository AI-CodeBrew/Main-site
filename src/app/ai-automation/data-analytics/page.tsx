import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Data, Analytics & AI Insight Systems",
  description: "Transform your data into actionable intelligence with AI-powered analytics that uncover hidden patterns, predict future trends, and drive strategic decision-making across your organization.",
  image: "/Business-Cards/Data Analytics & Scaling Roadmaps.png",
  category: "ai" as const
};

const overview = {
  title: "Intelligent Data Analytics Platform",
  description: "Unlock the full potential of your data with our AI-powered analytics platform that processes vast amounts of information to deliver real-time insights, predictive models, and automated reporting that drives business growth and competitive advantage.",
  features: [
    "Real-time data processing and analysis",
    "AI-powered predictive modeling",
    "Automated insight generation",
    "Interactive data visualization dashboards",
    "Natural language query capabilities",
    "Advanced statistical analysis and machine learning"
  ],
  image: "/Business-Cards/Data Analytics & Scaling Roadmaps2.png",
  imageAlt: "Data Analytics and AI Insights Dashboard"
};

const details = {
  title: "Comprehensive Data Intelligence Solutions",
  description: "Our Data, Analytics & AI Insight Systems combine advanced data engineering, machine learning, and business intelligence to transform raw data into strategic insights that drive informed decision-making and measurable business outcomes.",
  sections: [
    {
      title: "Advanced Data Processing",
      description: "Process and analyze massive datasets with lightning-fast performance using cutting-edge data engineering and AI technologies that scale with your business needs.",
      features: [
        "Real-time data streaming and processing",
        "Big data analytics and warehousing",
        "Data quality and cleansing automation",
        "ETL/ELT pipeline optimization",
        "Data lake and data mesh architecture",
        "Multi-source data integration"
      ]
    },
    {
      title: "AI-Powered Analytics & Insights",
      description: "Leverage machine learning and AI to uncover hidden patterns, predict future trends, and generate actionable insights that traditional analytics cannot provide.",
      features: [
        "Predictive modeling and forecasting",
        "Anomaly detection and alerting",
        "Natural language data querying",
        "Automated insight generation",
        "Pattern recognition and clustering",
        "Recommendation engine development"
      ]
    },
    {
      title: "Interactive Visualization & Reporting",
      description: "Create stunning, interactive dashboards and reports that make complex data accessible and actionable for stakeholders at every level of your organization.",
      features: [
        "Custom dashboard development",
        "Interactive data visualization",
        "Automated report generation",
        "Mobile-responsive analytics",
        "Self-service analytics tools",
        "Real-time KPI monitoring"
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
