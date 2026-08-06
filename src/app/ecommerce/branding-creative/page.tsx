import { ServicePageLayout } from "@/components/features/services/service-page-layout";

const hero = {
  title: "Branding & Creative Production",
  description: "Build a powerful brand that stands out in the marketplace with comprehensive branding and creative services. From logo design to product photography, create a cohesive brand identity that drives customer loyalty.",
  image: "/Business-Cards/Branding & Creative Production.png",
  category: "ecommerce" as const
};

const overview = {
  title: "Complete Branding & Creative Solutions",
  description: "Create a compelling brand identity that resonates with your target audience and drives business growth. Our comprehensive branding and creative services cover everything from visual identity to content production, ensuring your brand stands out in the competitive e-commerce landscape.",
  features: [
    "Logo design and brand identity development",
    "Product photography and lifestyle mockups",
    "Packaging design and brand guidelines",
    "Social media content and creative assets",
    "Website design and user experience",
    "Marketing materials and promotional content"
  ],
  image: "/Business-Cards/Branding & Creative Production2.png",
  imageAlt: "Branding and Creative Production Services"
};

const details = {
  title: "Comprehensive Branding & Creative Services",
  description: "Our Branding & Creative Production service provides end-to-end creative solutions that build strong brand identities and produce high-quality creative assets that drive engagement and sales.",
  sections: [
    {
      title: "Brand Identity & Design",
      description: "Develop a cohesive brand identity that reflects your values, resonates with your target audience, and differentiates you from competitors in the marketplace.",
      features: [
        "Logo design and brand mark development",
        "Color palette and typography selection",
        "Brand guidelines and style guide creation",
        "Business card and stationery design",
        "Brand voice and messaging development",
        "Competitive analysis and positioning"
      ]
    },
    {
      title: "Product Photography & Visual Content",
      description: "Create stunning visual content that showcases your products in the best light and drives conversions through compelling imagery and lifestyle photography.",
      features: [
        "Product photography and retouching",
        "Lifestyle and contextual photography",
        "Model and influencer photography",
        "Video content and motion graphics",
        "Social media visual content",
        "E-commerce image optimization"
      ]
    },
    {
      title: "Marketing & Promotional Materials",
      description: "Design and produce comprehensive marketing materials that effectively communicate your brand message and drive customer engagement across all channels.",
      features: [
        "Website design and user interface",
        "Email marketing templates",
        "Social media graphics and content",
        "Print materials and packaging design",
        "Advertising creatives and banners",
        "Presentation and pitch deck design"
      ]
    }
  ]
};

export default function BrandingCreativePage() {
  return (
    <ServicePageLayout
      hero={hero}
      overview={overview}
      details={details}
    />
  );
}
