import { ServiceTemplate } from "@/components/features/services/service-template";
import { VoiceDemoSection } from "@/components/home/voice-demo-section";
import { getService } from "@/lib/content/services";
import type { Metadata } from "next";

const service = getService("voice-chat");

export const metadata: Metadata = {
  title: service.headline,
  description: service.subheadline,
};

export default function Page() {
  return (
    <>
      <ServiceTemplate service={service} />
      <VoiceDemoSection />
    </>
  );
}
