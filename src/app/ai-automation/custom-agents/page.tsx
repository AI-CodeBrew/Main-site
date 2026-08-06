import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Custom AI Agent Development",
  description: "Build intelligent, purpose-built AI agents tailored to your specific business needs. From specialized task automation to complex decision-making systems, create AI solutions that work exactly how you need them to.",
  image: "/Business-Cards/Custom AI Agent Development.webp",
  category: "ai" as const
};

const overview = {
  title: "Bespoke AI Agent Solutions",
  description: "Develop custom AI agents that understand your unique business requirements, integrate seamlessly with your existing systems, and deliver intelligent automation that's perfectly aligned with your operational goals and workflows.",
  features: [
    "Custom AI agent architecture design",
    "Specialized task automation and execution",
    "Multi-agent system orchestration",
    "Integration with existing business systems",
    "Continuous learning and adaptation",
    "Scalable and maintainable AI solutions"
  ],
  image: "/Business-Cards/Custom AI Agent Development.webp",
  imageAlt: "Custom AI Agent Development Platform"
};

const details = {
  title: "Comprehensive AI Agent Development",
  description: "Our Custom AI Agent Development service creates intelligent, autonomous systems that can perform complex tasks, make decisions, and interact with humans and other systems in ways that are perfectly suited to your business requirements.",
  sections: [
    {
      title: "Agent Architecture & Design",
      description: "Design and architect custom AI agents with specific capabilities, knowledge domains, and interaction patterns that align perfectly with your business processes and requirements.",
      features: [
        "Custom agent personality and behavior design",
        "Domain-specific knowledge integration",
        "Multi-modal interaction capabilities",
        "Agent-to-agent communication protocols",
        "Scalable architecture planning",
        "Security and compliance considerations"
      ]
    },
    {
      title: "Intelligent Task Automation",
      description: "Develop AI agents that can perform complex, multi-step tasks autonomously while adapting to changing conditions and learning from experience to improve performance over time.",
      features: [
        "Complex workflow automation",
        "Decision-making algorithms",
        "Exception handling and recovery",
        "Learning and adaptation mechanisms",
        "Performance monitoring and optimization",
        "Human-in-the-loop integration"
      ]
    },
    {
      title: "Integration & Deployment",
      description: "Seamlessly integrate your custom AI agents with existing systems, deploy them across your infrastructure, and provide ongoing maintenance and optimization services.",
      features: [
        "API and system integration",
        "Cloud and on-premise deployment",
        "Monitoring and logging systems",
        "Performance optimization",
        "Regular updates and improvements",
        "24/7 support and maintenance"
      ]
    }
  ]
};

export default function CustomAgentsPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
