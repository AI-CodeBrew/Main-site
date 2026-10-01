import type { Metadata } from "next";
import { TalkToExpert } from "@/components/features/contact/talk-to-expert";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Talk to an Expert",
  description:
    "Tell Fynk Tech where work slows down. Book a free consultation on AI agents or e-commerce, or message us on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <TalkToExpert />
    </main>
  );
}
