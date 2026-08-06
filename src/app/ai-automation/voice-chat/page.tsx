import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "AI Voice & Chat Automation",
  description: "Transform customer interactions with intelligent conversational AI that understands, responds, and delivers exceptional experiences 24/7.",
  image: "/Business-Cards/AI Voice & Chat Automation.png",
  category: "ai" as const
};

const overview = {
  title: "Revolutionary Conversational AI",
  description: "Our AI Voice & Chat Automation solutions leverage cutting-edge natural language processing and machine learning to create intelligent, context-aware conversations that feel natural and human-like. From customer support to sales assistance, our AI agents handle complex queries with precision and empathy.",
  features: [
    "24/7 intelligent customer support",
    "Multi-language conversation capabilities",
    "Context-aware responses and memory",
    "Seamless handoff to human agents",
    "Real-time sentiment analysis",
    "Custom voice and personality training"
  ],
  image: "/Business-Cards/AI Voice & Chat Automation2.png",
  imageAlt: "AI Voice and Chat Automation Interface"
};

const details = {
  title: "Comprehensive AI Conversation Solutions",
  description: "Our AI Voice & Chat Automation platform combines advanced NLP, machine learning, and real-time processing to deliver conversations that exceed customer expectations while reducing operational costs.",
  sections: [
    {
      title: "Intelligent Voice Assistants",
      description: "Create natural-sounding voice assistants that can handle complex customer interactions with human-like understanding and response capabilities.",
      features: [
        "Natural language understanding (NLU)",
        "Text-to-speech with custom voices",
        "Speech-to-text with high accuracy",
        "Real-time conversation processing",
        "Emotion detection and response",
        "Multi-turn conversation management"
      ]
    },
    {
      title: "Advanced Chat Automation",
      description: "Deploy intelligent chatbots that can handle everything from simple FAQs to complex problem-solving, with seamless escalation to human agents when needed.",
      features: [
        "Contextual conversation flow",
        "Intent recognition and classification",
        "Dynamic response generation",
        "Knowledge base integration",
        "Escalation management",
        "Conversation analytics and insights"
      ]
    },
    {
      title: "Integration & Customization",
      description: "Seamlessly integrate with your existing systems and customize the AI behavior to match your brand voice and business requirements.",
      features: [
        "CRM and helpdesk integration",
        "API and webhook connectivity",
        "Custom training on your data",
        "Brand voice and personality setup",
        "Multi-channel deployment",
        "Real-time monitoring and optimization"
      ]
    }
  ]
};

export default function AIVoiceChatPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
