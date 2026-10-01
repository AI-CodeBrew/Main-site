import type { MetadataRoute } from "next";
import { listBlogs } from "@/lib/blogs/store";
import { STATIC_PUBLIC_PATHS, absUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_PATHS.map((path) => ({
    url: absUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const result = await listBlogs();
    if (result.ok) {
      blogEntries = result.data.map((b) => ({
        url: absUrl(`/blogs/${b.slug}`),
        lastModified: b.updated_at ? new Date(b.updated_at) : new Date(b.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }));
    }
  } catch {
    // Soft-fail: static URLs still publish if blogs API is down
  }

  return [...staticEntries, ...blogEntries];
}
