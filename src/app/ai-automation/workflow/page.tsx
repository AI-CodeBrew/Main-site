import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Business Workflow Automation",
  description: "Streamline your operations with intelligent automation that eliminates manual tasks, reduces errors, and accelerates business processes across your entire organization.",
  image: "/Business-Cards/Business Workflow Automation.png",
  category: "ai" as const
};

const overview = {
  title: "Intelligent Process Automation",
  description: "Transform your business operations with AI-powered workflow automation that learns, adapts, and optimizes your processes in real-time. From simple task automation to complex multi-step workflows, our solutions deliver measurable efficiency gains and cost savings.",
  features: [
    "End-to-end process automation",
    "AI-powered decision making",
    "Real-time process monitoring",
    "Intelligent error handling and recovery",
    "Cross-system integration capabilities",
    "Scalable automation architecture"
  ],
  image: "/Business-Cards/Business Workflow Automation2.png",
  imageAlt: "Business Workflow Automation Dashboard"
};

const details = {
  title: "Comprehensive Workflow Solutions",
  description: "Our Business Workflow Automation platform combines robotic process automation (RPA), AI decision engines, and intelligent orchestration to automate complex business processes while maintaining human oversight and control.",
  sections: [
    {
      title: "Process Discovery & Analysis",
      description: "Identify automation opportunities and analyze existing processes to create optimal automation strategies that deliver maximum ROI.",
      features: [
        "Process mining and discovery",
        "Bottleneck identification and analysis",
        "ROI calculation and forecasting",
        "Process mapping and documentation",
        "Compliance and audit trail setup",
        "Change management planning"
      ]
    },
    {
      title: "Intelligent Automation Design",
      description: "Design and implement sophisticated automation workflows that can handle complex business logic, exceptions, and decision points with minimal human intervention.",
      features: [
        "Visual workflow designer",
        "AI-powered decision trees",
        "Exception handling and escalation",
        "Multi-approval workflows",
        "Conditional logic and branching",
        "Integration with existing systems"
      ]
    },
    {
      title: "Monitoring & Optimization",
      description: "Continuously monitor and optimize your automated processes using AI-driven insights and performance analytics to ensure peak efficiency.",
      features: [
        "Real-time performance dashboards",
        "Predictive analytics and forecasting",
        "Automated optimization recommendations",
        "Performance benchmarking",
        "Cost tracking and analysis",
        "Continuous improvement cycles"
      ]
    }
  ]
};

export default function BusinessWorkflowPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
