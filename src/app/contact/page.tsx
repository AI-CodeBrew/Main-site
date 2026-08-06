import { PageHero } from "@/components/common/page-hero";
import { PageOverview } from "@/components/features/common/page-overview";
import { GlobalPresence } from "@/components/features/contact/global-presence";
import { Contact } from "@/components/features/contact/contact";

const contactOverview = {
  title: "Ready to Transform Your Business?",
  description: "Join hundreds of successful companies who have revolutionized their operations with our AI automation and e-commerce solutions. Our expert team is ready to help you achieve your business goals with cutting-edge technology and proven strategies.",
  features: [
    "Free consultation and strategy session",
    "Custom AI automation solutions",
    "Complete e-commerce development",
    "24/7 dedicated support team",
    "Global implementation expertise",
    "Proven track record of success"
  ],
  image: "/contact.jpeg",
  imageAlt: "Contact Fynk Tech for Business Solutions"
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PageHero 
        title="Get In Touch"
        subtitle="Let's Build Something Amazing Together"
        description="Ready to transform your business with AI automation and e-commerce solutions? Contact us today for a free consultation."
        backgroundImage="/contact.jpeg"
      />
      <PageOverview {...contactOverview} />
      <GlobalPresence />
      <Contact />
    </main>
  );
}
