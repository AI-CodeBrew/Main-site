import { PageHero } from "@/components/common/page-hero";
import { PageOverview } from "@/components/features/common/page-overview";
import { About } from "@/components/features/about/about";
import { ClientLogos } from "@/components/common/client-logos";
import { FeaturedIn } from "@/components/common/featured-in";
import { Testimonials } from "@/components/features/about/testimonials";
import { Contact } from "@/components/features/contact/contact";

const aboutOverview = {
  title: "Leading the Future of AI & E-commerce",
  description: "Fynk Tech stands at the forefront of technological innovation, combining cutting-edge AI automation with world-class e-commerce solutions to transform businesses across the globe. Our mission is to democratize advanced technology and make it accessible to companies of all sizes.",
  features: [
    "AI-first approach to business automation",
    "Global presence across 20+ countries",
    "500+ successful projects delivered",
    "250+ active clients worldwide",
    "8+ years of industry expertise",
    "Cutting-edge technology partnerships"
  ],
  image: "/about.jpeg",
  imageAlt: "Fynk Tech Team and Innovation"
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHero 
        title="About Fynk Tech"
        subtitle="Innovation, Excellence, Results"
        description="Meet the team behind the future of AI automation and e-commerce solutions. Learn about our mission, values, and commitment to your success."
        backgroundImage="/about.jpeg"
      />
      <PageOverview {...aboutOverview} />
      <About />
      <ClientLogos />
      <FeaturedIn />
      <Testimonials />
      <Contact />
    </main>
  );
}
