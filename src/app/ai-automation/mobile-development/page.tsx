import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Mobile App Development",
  description: "Create powerful, native and cross-platform mobile applications that deliver exceptional user experiences. From iOS to Android, build apps that engage users and drive business growth.",
  image: "/Business-Cards/mobiledevelopment.avif",
  category: "ai" as const
};

const overview = {
  title: "Advanced Mobile App Development",
  description: "Develop cutting-edge mobile applications using the latest technologies and AI-powered development tools. Our mobile solutions combine native performance with cross-platform efficiency to deliver apps that users love and businesses rely on.",
  features: [
    "Native iOS and Android development",
    "Cross-platform React Native and Flutter apps",
    "AI-powered mobile features and automation",
    "Progressive Web App (PWA) solutions",
    "App store optimization and deployment",
    "Performance optimization and testing"
  ],
  image: "/Business-Cards/mobiledevelopment2.png",
  imageAlt: "Mobile App Development and AI Integration"
};

const details = {
  title: "Comprehensive Mobile Development Solutions",
  description: "Our Mobile App Development service covers the entire mobile development lifecycle, from concept to deployment, using modern frameworks and AI-enhanced development practices to create apps that stand out in the marketplace.",
  sections: [
    {
      title: "Native Mobile Development",
      description: "Build high-performance native applications for iOS and Android using platform-specific technologies and best practices for optimal user experience and device integration.",
      features: [
        "iOS development with Swift and SwiftUI",
        "Android development with Kotlin and Jetpack Compose",
        "Native device feature integration",
        "Platform-specific UI/UX design",
        "App Store and Google Play optimization",
        "Performance tuning and memory management"
      ]
    },
    {
      title: "Cross-Platform Development",
      description: "Create efficient cross-platform applications using React Native and Flutter that share code between platforms while maintaining native performance and user experience.",
      features: [
        "React Native app development",
        "Flutter app development",
        "Code sharing and reusability",
        "Platform-specific customizations",
        "Hot reload and fast development cycles",
        "Cross-platform testing strategies"
      ]
    },
    {
      title: "AI-Powered Mobile Features",
      description: "Integrate AI capabilities into mobile applications, from machine learning models to intelligent automation, creating smart apps that provide enhanced user experiences.",
      features: [
        "On-device machine learning integration",
        "AI-powered personalization",
        "Intelligent automation and workflows",
        "Computer vision and image recognition",
        "Natural language processing features",
        "Predictive analytics and recommendations"
      ]
    }
  ]
};

export default function MobileDevelopmentPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
