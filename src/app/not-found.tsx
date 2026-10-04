import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { NotFound as NotFoundView } from "@/components/ui/not-found-2";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description:
    "That page doesn’t exist on FynkTech. Go home or explore our case studies for AI agents and e-commerce help.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main>
      <NotFoundView />
    </main>
  );
}
