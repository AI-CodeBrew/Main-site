import type { Metadata } from "next";
import { ServiceSeoPage, servicePageMetadata } from "@/components/seo/service-seo-page";

export const metadata: Metadata = servicePageMetadata("ai", "workflow");

export default function Page() {
  return <ServiceSeoPage category="ai" slug="workflow" />;
}
