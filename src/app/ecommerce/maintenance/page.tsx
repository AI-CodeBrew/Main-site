import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Maintenance & Long-Term Store Management",
  description: "Keep your e-commerce store running smoothly with comprehensive maintenance and long-term management services. From performance optimization to security updates, we ensure your store stays fast, secure, and profitable.",
  image: "/Business-Cards/Maintenance &Long-TermStore Management.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Comprehensive Store Maintenance & Management",
  description: "Ensure your e-commerce store operates at peak performance with our comprehensive maintenance and long-term management services. From technical updates to performance optimization, we keep your store running smoothly while you focus on growing your business.",
  features: [
    "24/7 technical monitoring and support",
    "Regular performance optimization and updates",
    "Security monitoring and vulnerability management",
    "Plugin and app updates and maintenance",
    "Backup and disaster recovery services",
    "Dedicated account management and support"
  ],
  image: "/Business-Cards/Maintenance&Long-TermStore Management2.png",
  imageAlt: "Maintenance and Long-Term Store Management"
};

const details = {
  title: "End-to-End Store Maintenance Services",
  description: "Our Maintenance & Long-Term Store Management service provides comprehensive ongoing support and optimization to ensure your e-commerce store remains secure, fast, and profitable throughout its lifecycle.",
  sections: [
    {
      title: "Technical Maintenance & Updates",
      description: "Keep your store's technical infrastructure up-to-date and optimized with regular maintenance, updates, and performance improvements.",
      features: [
        "Platform and plugin updates",
        "Security patches and vulnerability fixes",
        "Performance optimization and speed improvements",
        "Database maintenance and optimization",
        "Server monitoring and management",
        "SSL certificate management"
      ]
    },
    {
      title: "Monitoring & Support",
      description: "Provide 24/7 monitoring and support services to ensure your store remains operational and performs optimally at all times.",
      features: [
        "Uptime monitoring and alerting",
        "Performance metrics tracking",
        "Error monitoring and resolution",
        "Security scanning and threat detection",
        "Backup verification and testing",
        "Emergency response and incident management"
      ]
    },
    {
      title: "Ongoing Optimization & Growth",
      description: "Continuously optimize your store for better performance, conversions, and user experience while planning for future growth and scalability.",
      features: [
        "Conversion rate optimization",
        "SEO monitoring and improvements",
        "User experience enhancements",
        "Mobile optimization and testing",
        "Analytics review and recommendations",
        "Growth planning and strategy updates"
      ]
    }
  ]
};

export default function MaintenancePage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
