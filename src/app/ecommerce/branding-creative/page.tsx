import type { Metadata } from "next";
import { ServiceSeoPage, servicePageMetadata } from "@/components/seo/service-seo-page";

export const metadata: Metadata = servicePageMetadata("ecommerce", "branding-creative");

export default function Page() {
  return <ServiceSeoPage category="ecommerce" slug="branding-creative" />;
}
