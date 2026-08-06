import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "UI/UX Design",
  description: "Create beautiful, intuitive user experiences that delight users and drive business success. From wireframes to pixel-perfect designs, craft interfaces that users love to interact with.",
  image: "/Business-Cards/UI:UXDesign.png",
  category: "ai" as const
};

const overview = {
  title: "Exceptional UI/UX Design Solutions",
  description: "Design user experiences that combine aesthetic appeal with functional excellence. Our UI/UX design process leverages user research, AI-powered design tools, and modern design principles to create interfaces that users love and businesses benefit from.",
  features: [
    "User-centered design methodology",
    "AI-powered design optimization",
    "Responsive and accessible designs",
    "Interactive prototypes and testing",
    "Design system creation and maintenance",
    "Usability testing and optimization"
  ],
  image: "/Business-Cards/UI:UX Design2.png",
  imageAlt: "UI/UX Design and User Experience"
};

const details = {
  title: "Comprehensive Design Services",
  description: "Our UI/UX Design service covers the entire design process, from user research and wireframing to high-fidelity prototypes and design system implementation, ensuring consistent and exceptional user experiences across all touchpoints.",
  sections: [
    {
      title: "User Research & Strategy",
      description: "Understand your users deeply through comprehensive research and analysis, then develop design strategies that align with user needs and business objectives.",
      features: [
        "User persona development and analysis",
        "User journey mapping and optimization",
        "Competitive analysis and benchmarking",
        "Usability testing and feedback collection",
        "Accessibility audit and compliance",
        "Design strategy and roadmap planning"
      ]
    },
    {
      title: "Design & Prototyping",
      description: "Create stunning visual designs and interactive prototypes that bring your ideas to life, using modern design tools and AI-powered optimization techniques.",
      features: [
        "Wireframing and information architecture",
        "Visual design and branding integration",
        "Interactive prototyping and animation",
        "Mobile-first responsive design",
        "Design system and component library",
        "AI-powered design optimization"
      ]
    },
    {
      title: "Implementation & Testing",
      description: "Collaborate closely with development teams to ensure pixel-perfect implementation and conduct thorough testing to validate design decisions and optimize user experience.",
      features: [
        "Design-to-development handoff",
        "Quality assurance and design review",
        "A/B testing and conversion optimization",
        "Performance and usability monitoring",
        "Design system maintenance and updates",
        "Continuous improvement and iteration"
      ]
    }
  ]
};

export default function UIUXDesignPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
