import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description:
    "That page doesn’t exist on FynkTech. Go home or contact us for AI agents and e-commerce help.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-subtle">404</p>
      <h1 className="mt-3 text-3xl font-bold text-heading md:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-body">
        The page you’re looking for doesn’t exist or was moved. Try the homepage or talk to our team.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/contact" className="font-semibold underline-offset-4 hover:underline" style={{ color: "#5A83FF" }}>
          Talk to an expert
        </Link>
      </div>
    </main>
  );
}
