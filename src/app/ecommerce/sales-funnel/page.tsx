import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Sales Funnel Optimization",
  description: "Transform visitors into paying customers with optimized sales funnels that maximize conversions. From store audits to upsell strategies, we optimize every step of your customer journey.",
  image: "/Business-Cards/SalesFunnelOptimization.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Conversion-Focused Sales Optimization",
  description: "Maximize your e-commerce revenue with data-driven sales funnel optimization that identifies bottlenecks, improves conversion rates, and creates seamless customer experiences that drive sales and increase average order value.",
  features: [
    "Comprehensive store performance audits",
    "Conversion rate optimization (CRO)",
    "Upsell and cross-sell strategy implementation",
    "Cart abandonment recovery systems",
    "Retargeting funnel optimization",
    "A/B testing and continuous improvement"
  ],
  image: "/Business-Cards/SalesFunnelOptimization2.png",
  imageAlt: "Sales Funnel Optimization and Conversion"
};

const details = {
  title: "Comprehensive Sales Optimization Services",
  description: "Our Sales Funnel Optimization service provides end-to-end solutions that analyze, optimize, and continuously improve your sales funnel to maximize conversions, revenue, and customer lifetime value.",
  sections: [
    {
      title: "Funnel Analysis & Auditing",
      description: "Conduct comprehensive analysis of your current sales funnel to identify bottlenecks, drop-off points, and optimization opportunities that can significantly impact your conversion rates.",
      features: [
        "Complete funnel mapping and analysis",
        "Conversion rate analysis by stage",
        "User behavior and heatmap analysis",
        "Mobile vs desktop performance review",
        "Competitor funnel benchmarking",
        "Revenue impact assessment"
      ]
    },
    {
      title: "Conversion Rate Optimization",
      description: "Implement data-driven optimization strategies that improve conversion rates at every stage of your sales funnel, from landing pages to checkout completion.",
      features: [
        "Landing page optimization",
        "Product page conversion improvements",
        "Checkout flow optimization",
        "Trust signals and social proof implementation",
        "Mobile experience optimization",
        "Page speed and performance improvements"
      ]
    },
    {
      title: "Revenue Enhancement Strategies",
      description: "Implement advanced strategies to increase average order value, customer lifetime value, and overall revenue through upsells, cross-sells, and retention programs.",
      features: [
        "Upsell and cross-sell implementation",
        "Dynamic pricing strategies",
        "Bundle and package optimization",
        "Subscription model setup",
        "Loyalty program development",
        "Customer retention campaigns"
      ]
    }
  ]
};

export default function SalesFunnelPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
