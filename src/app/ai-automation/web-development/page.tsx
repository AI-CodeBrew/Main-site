import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Web Development",
  description: "Build modern, scalable web applications with cutting-edge technologies and AI-powered development tools. From responsive frontends to robust backends, create digital experiences that drive business growth.",
  image: "/Business-Cards/webdevelopment.png",
  category: "ai" as const
};

const overview = {
  title: "Modern Web Development Solutions",
  description: "Create powerful, scalable web applications using the latest technologies and AI-assisted development practices. Our full-stack development approach ensures your web solutions are fast, secure, and perfectly aligned with your business objectives.",
  features: [
    "Full-stack web application development",
    "AI-powered development tools and automation",
    "Responsive and mobile-first design",
    "Performance optimization and SEO",
    "Security and scalability best practices",
    "Modern frameworks and technologies"
  ],
  image: "/Business-Cards/webdevelopment2.png",
  imageAlt: "Web Development and AI-Assisted Coding"
};

const details = {
  title: "Comprehensive Web Development Services",
  description: "Our Web Development service combines traditional development expertise with AI-powered tools and modern frameworks to deliver exceptional web applications that meet your business needs and exceed user expectations.",
  sections: [
    {
      title: "Frontend Development",
      description: "Create stunning, interactive user interfaces with modern frontend frameworks and AI-assisted development tools that ensure optimal user experience and performance.",
      features: [
        "React, Vue.js, and Angular applications",
        "Next.js and Nuxt.js SSR solutions",
        "Progressive Web App (PWA) development",
        "AI-powered UI/UX optimization",
        "Responsive design and mobile optimization",
        "Performance optimization and Core Web Vitals"
      ]
    },
    {
      title: "Backend Development",
      description: "Build robust, scalable backend systems with modern architectures and AI-enhanced development practices that ensure reliability, security, and performance.",
      features: [
        "Node.js, Python, and Go backend services",
        "RESTful and GraphQL API development",
        "Microservices architecture implementation",
        "Database design and optimization",
        "AI-powered code generation and optimization",
        "Cloud-native and serverless solutions"
      ]
    },
    {
      title: "DevOps & Deployment",
      description: "Implement modern DevOps practices with automated deployment pipelines, monitoring, and AI-powered optimization to ensure your web applications run smoothly and efficiently.",
      features: [
        "CI/CD pipeline setup and automation",
        "Docker containerization and orchestration",
        "Cloud deployment and scaling",
        "Performance monitoring and analytics",
        "Security scanning and vulnerability management",
        "Automated testing and quality assurance"
      ]
    }
  ]
};

export default function WebDevelopmentPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
