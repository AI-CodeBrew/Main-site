import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Marketing & Growth Systems",
  description: "Drive traffic and conversions with data-driven marketing strategies and growth systems. From Facebook ads to email marketing, we create comprehensive campaigns that scale your e-commerce business.",
  image: "/Business-Cards/Marketing & Growth Systems.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Data-Driven Marketing Solutions",
  description: "Accelerate your e-commerce growth with comprehensive marketing strategies and automated growth systems. Our data-driven approach combines multiple channels and advanced analytics to maximize ROI and drive sustainable business growth.",
  features: [
    "Multi-channel advertising campaigns",
    "Email and SMS marketing automation",
    "Influencer and social media marketing",
    "Conversion rate optimization (CRO)",
    "A/B testing and performance analytics",
    "Customer acquisition and retention strategies"
  ],
  image: "/Business-Cards/Marketing & Growth Systems2.png",
  imageAlt: "Marketing and Growth Systems"
};

const details = {
  title: "Comprehensive Marketing & Growth Services",
  description: "Our Marketing & Growth Systems service provides end-to-end marketing solutions that combine creative excellence with data-driven optimization to drive traffic, conversions, and sustainable business growth.",
  sections: [
    {
      title: "Paid Advertising & Campaigns",
      description: "Create and optimize high-performing advertising campaigns across multiple platforms to drive targeted traffic and maximize return on ad spend.",
      features: [
        "Facebook and Instagram advertising",
        "Google Ads and Shopping campaigns",
        "TikTok and Snapchat advertising",
        "Pinterest and YouTube marketing",
        "Campaign optimization and A/B testing",
        "Retargeting and lookalike audiences"
      ]
    },
    {
      title: "Email & SMS Marketing",
      description: "Build and nurture customer relationships through automated email and SMS marketing campaigns that drive engagement, retention, and repeat purchases.",
      features: [
        "Email marketing automation setup",
        "SMS marketing and notifications",
        "Customer segmentation and personalization",
        "Abandoned cart recovery campaigns",
        "Welcome series and onboarding flows",
        "Loyalty and retention programs"
      ]
    },
    {
      title: "Growth Hacking & Optimization",
      description: "Implement growth hacking strategies and continuous optimization to maximize conversions, customer lifetime value, and sustainable business growth.",
      features: [
        "Conversion rate optimization (CRO)",
        "Landing page optimization",
        "Funnel analysis and improvement",
        "Customer acquisition cost optimization",
        "Viral and referral program development",
        "Growth analytics and reporting"
      ]
    }
  ]
};

export default function MarketingGrowthPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
