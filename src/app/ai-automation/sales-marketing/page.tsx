import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "AI Sales & Marketing Automation",
  description: "Supercharge your sales and marketing efforts with AI-powered automation that personalizes customer experiences, optimizes campaigns, and drives measurable growth across all channels.",
  image: "/Business-Cards/AI Sales & Marketing Automation.avif",
  category: "ai" as const
};

const overview = {
  title: "Intelligent Sales & Marketing AI",
  description: "Transform your sales and marketing operations with AI that understands customer behavior, predicts buying patterns, and automates personalized outreach at scale. Our solutions deliver higher conversion rates, better customer engagement, and significant ROI improvements.",
  features: [
    "AI-powered lead scoring and qualification",
    "Personalized content generation at scale",
    "Predictive analytics for customer behavior",
    "Automated multi-channel campaign orchestration",
    "Real-time performance optimization",
    "Advanced customer segmentation and targeting"
  ],
  image: "/Business-Cards/AI Sales & Marketing Automation.avif",
  imageAlt: "AI Sales and Marketing Automation Platform"
};

const details = {
  title: "Comprehensive Sales & Marketing Solutions",
  description: "Our AI Sales & Marketing Automation platform combines advanced machine learning, natural language processing, and behavioral analytics to create highly effective, personalized customer experiences that drive growth and loyalty.",
  sections: [
    {
      title: "Intelligent Lead Management",
      description: "Automate lead capture, scoring, and nurturing with AI that learns from your best customers to identify high-value prospects and optimize conversion paths.",
      features: [
        "AI-powered lead scoring algorithms",
        "Behavioral pattern recognition",
        "Automated lead qualification",
        "Smart lead routing and assignment",
        "Predictive lead conversion modeling",
        "Multi-touch attribution tracking"
      ]
    },
    {
      title: "Personalized Content & Campaigns",
      description: "Generate and deliver highly personalized content, emails, and campaigns that resonate with each customer segment using AI-driven insights and automation.",
      features: [
        "Dynamic content generation",
        "Personalized email sequences",
        "AI-written marketing copy",
        "Automated A/B testing",
        "Cross-channel campaign orchestration",
        "Real-time content optimization"
      ]
    },
    {
      title: "Advanced Analytics & Insights",
      description: "Gain deep insights into customer behavior, campaign performance, and market trends with AI-powered analytics that provide actionable recommendations for growth.",
      features: [
        "Customer journey mapping",
        "Predictive analytics and forecasting",
        "ROI and attribution analysis",
        "Market trend identification",
        "Competitive intelligence",
        "Performance optimization recommendations"
      ]
    }
  ]
};

export default function AISalesMarketingPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
