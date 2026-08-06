import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Cloud Application Development",
  description: "Build scalable, secure cloud applications that leverage the power of modern cloud platforms and AI services. From microservices to serverless architectures, create applications that grow with your business.",
  image: "/Business-Cards/Cloud Application.png",
  category: "ai" as const
};

const overview = {
  title: "Scalable Cloud Application Solutions",
  description: "Develop robust, scalable cloud applications using modern cloud platforms and AI-powered services. Our cloud development approach ensures your applications are secure, performant, and cost-effective while leveraging the latest cloud technologies.",
  features: [
    "Multi-cloud and hybrid cloud solutions",
    "Serverless and microservices architecture",
    "AI-powered cloud optimization",
    "Auto-scaling and load balancing",
    "Security and compliance implementation",
    "Cost optimization and monitoring"
  ],
  image: "/Business-Cards/Cloud Application.png",
  imageAlt: "Cloud Application Development and Architecture"
};

const details = {
  title: "Comprehensive Cloud Development Services",
  description: "Our Cloud Application Development service covers the entire cloud development lifecycle, from architecture design to deployment and optimization, using modern cloud platforms and AI-enhanced development practices.",
  sections: [
    {
      title: "Cloud Architecture & Design",
      description: "Design scalable, secure cloud architectures that leverage the best of modern cloud platforms and services, ensuring optimal performance and cost efficiency.",
      features: [
        "Cloud-native architecture design",
        "Microservices and serverless architecture",
        "Multi-cloud and hybrid cloud strategies",
        "Security and compliance architecture",
        "Disaster recovery and backup planning",
        "Performance and scalability optimization"
      ]
    },
    {
      title: "Cloud Application Development",
      description: "Build and deploy cloud applications using modern development practices, containerization, and cloud-native technologies for optimal performance and scalability.",
      features: [
        "Containerized application development",
        "Serverless function development",
        "API development and integration",
        "Database design and optimization",
        "CI/CD pipeline implementation",
        "Cloud service integration"
      ]
    },
    {
      title: "DevOps & Cloud Operations",
      description: "Implement comprehensive DevOps practices and cloud operations management to ensure reliable, secure, and cost-effective cloud application deployment and maintenance.",
      features: [
        "Infrastructure as Code (IaC) implementation",
        "Automated deployment and scaling",
        "Monitoring and logging setup",
        "Security scanning and compliance",
        "Cost optimization and resource management",
        "24/7 cloud operations support"
      ]
    }
  ]
};

export default function CloudApplicationPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
