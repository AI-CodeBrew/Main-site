import type { Metadata } from "next";
import { TalkToExpert } from "@/components/features/contact/talk-to-expert";

export const metadata: Metadata = {
  title: "Talk to an expert",
  description:
    "Tell Fynk Tech where the work slows down. Talk to an expert about AI automation and e-commerce, or message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <TalkToExpert />
    </main>
  );
}
