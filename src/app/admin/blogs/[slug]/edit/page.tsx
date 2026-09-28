import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs/store";
import { BlogForm } from "../../blog-form";

export const dynamic = "force-dynamic";

// /admin/* is protected by middleware.ts, so drafts can be loaded here.
export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug, { includeDrafts: true });

  if (!result.ok) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-red-600 mb-4">Could not load this blog: {result.error}</p>
        <Link href="/admin/blogs" className="text-[#5A83FF] hover:underline">
          ← Back to blogs
        </Link>
      </main>
    );
  }
  if (!result.data) notFound();

  return <BlogForm blog={result.data} />;
}
