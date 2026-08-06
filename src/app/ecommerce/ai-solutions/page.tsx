import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "AI for eCommerce",
  description: "Revolutionize your e-commerce business with AI-powered solutions that enhance customer experience, automate operations, and drive sales. From intelligent chatbots to predictive analytics, harness the power of AI for competitive advantage.",
  image: "/Business-Cards/AI for eCommerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation).png",
  category: "ecommerce" as const
};

const overview = {
  title: "Intelligent E-commerce AI Solutions",
  description: "Transform your e-commerce business with cutting-edge AI technologies that personalize customer experiences, automate operations, and optimize every aspect of your online store. Our AI solutions drive engagement, increase conversions, and provide sustainable competitive advantages.",
  features: [
    "AI-powered customer support chatbots",
    "Intelligent product recommendation engines",
    "Automated return and refund processing",
    "AI-driven upselling and cross-selling",
    "Predictive inventory and demand forecasting",
    "Voice and WhatsApp AI assistants"
  ],
  image: "/Business-Cards/AI for eCommerce (Customer Support Bots, Return Bots, Upsell AI, Review Generation)2.png",
  imageAlt: "AI for eCommerce Solutions"
};

const details = {
  title: "Comprehensive AI E-commerce Solutions",
  description: "Our AI for eCommerce service provides end-to-end artificial intelligence solutions that transform every aspect of your online business, from customer interactions to operational efficiency and strategic decision-making.",
  sections: [
    {
      title: "AI Customer Experience",
      description: "Enhance customer interactions with intelligent AI systems that provide personalized experiences, instant support, and seamless shopping journeys.",
      features: [
        "Intelligent chatbots and virtual assistants",
        "AI-powered product recommendations",
        "Personalized shopping experiences",
        "Voice and conversational commerce",
        "WhatsApp and social media AI integration",
        "Real-time customer sentiment analysis"
      ]
    },
    {
      title: "AI Sales & Marketing Automation",
      description: "Automate and optimize your sales and marketing efforts with AI that understands customer behavior and delivers targeted, high-converting campaigns.",
      features: [
        "AI-driven upselling and cross-selling",
        "Dynamic pricing optimization",
        "Automated email and SMS campaigns",
        "Predictive customer segmentation",
        "AI-generated marketing content",
        "Intelligent ad targeting and optimization"
      ]
    },
    {
      title: "AI Operations & Analytics",
      description: "Streamline operations and gain deep insights with AI-powered analytics, forecasting, and automation that optimize every aspect of your business.",
      features: [
        "Predictive inventory management",
        "AI-powered demand forecasting",
        "Automated fraud detection",
        "Intelligent supply chain optimization",
        "Advanced analytics and insights",
        "Automated reporting and recommendations"
      ]
    }
  ]
};

export default function AISolutionsPage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
