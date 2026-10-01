import type { Metadata } from "next";
import { RoiCalculatorClient } from "@/components/features/roi/roi-calculator-client";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Support ROI Calculator",
  description:
    "Estimate hours and cost saved by automating support with AI. Free ROI calculator from Fynk Tech — then talk to an expert.",
  path: "/roi-calculator",
});

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "ROI Calculator", path: "/roi-calculator" },
        ])}
      />
      <RoiCalculatorClient />
    </>
  );
}
