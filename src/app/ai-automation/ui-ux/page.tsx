import type { Metadata } from "next";
import { ServiceSeoPage, servicePageMetadata } from "@/components/seo/service-seo-page";

export const metadata: Metadata = servicePageMetadata("ai", "ui-ux");

export default function Page() {
  return <ServiceSeoPage category="ai" slug="ui-ux" />;
}
