import type { Metadata } from "next";
import { ServiceSeoPage, servicePageMetadata } from "@/components/seo/service-seo-page";

export const metadata: Metadata = servicePageMetadata("ai", "web-development");

export default function Page() {
  return <ServiceSeoPage category="ai" slug="web-development" />;
}
