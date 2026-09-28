import { ServiceTemplate } from "@/components/features/services/service-template";
import { getService } from "@/lib/content/services";
import type { Metadata } from "next";

const service = getService("data-analytics", "ecommerce");

export const metadata: Metadata = {
  title: service.headline,
  description: service.subheadline,
};

export default function Page() {
  return <ServiceTemplate service={service} />;
}
