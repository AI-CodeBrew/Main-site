import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Quality Assurance, Maintenance & Support",
  description: "Ensure your applications run flawlessly with comprehensive QA testing, ongoing maintenance, and 24/7 support services. From automated testing to performance optimization, keep your systems running at peak efficiency.",
  image: "/Business-Cards/quality-control.png",
  category: "ai" as const
};

const overview = {
  title: "Comprehensive QA & Support Solutions",
  description: "Deliver exceptional software quality and reliability with our comprehensive Quality Assurance, Maintenance & Support services. Our AI-powered testing and monitoring solutions ensure your applications perform optimally while providing ongoing support and maintenance.",
  features: [
    "AI-powered automated testing",
    "Comprehensive quality assurance processes",
    "24/7 monitoring and support",
    "Performance optimization and tuning",
    "Security testing and vulnerability assessment",
    "Continuous integration and deployment"
  ],
  image: "/Business-Cards/quality-control.png",
  imageAlt: "Quality Assurance and Support Services"
};

const details = {
  title: "End-to-End Quality & Support Services",
  description: "Our Quality Assurance, Maintenance & Support service provides comprehensive testing, monitoring, and support solutions that ensure your applications maintain high performance, security, and reliability throughout their lifecycle.",
  sections: [
    {
      title: "Quality Assurance & Testing",
      description: "Implement comprehensive testing strategies using AI-powered tools and manual testing expertise to ensure your applications meet the highest quality standards and user expectations.",
      features: [
        "Automated testing suite development",
        "AI-powered test case generation",
        "Performance and load testing",
        "Security and penetration testing",
        "User acceptance testing (UAT)",
        "Cross-browser and cross-platform testing"
      ]
    },
    {
      title: "Monitoring & Maintenance",
      description: "Provide continuous monitoring and proactive maintenance services to ensure your applications run smoothly and efficiently, with rapid response to any issues that arise.",
      features: [
        "24/7 application monitoring",
        "Performance metrics and analytics",
        "Automated alerting and incident response",
        "Regular security updates and patches",
        "Database optimization and maintenance",
        "Infrastructure health monitoring"
      ]
    },
    {
      title: "Support & Optimization",
      description: "Deliver ongoing support services and continuous optimization to ensure your applications remain secure, performant, and aligned with evolving business requirements.",
      features: [
        "Multi-tier support (L1, L2, L3)",
        "Bug fixes and issue resolution",
        "Feature enhancements and updates",
        "Code refactoring and optimization",
        "Documentation and knowledge transfer",
        "Training and team enablement"
      ]
    }
  ]
};

export default function QASupportPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
