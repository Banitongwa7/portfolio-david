import type { MetadataRoute } from "next";
import AllTools from "@/data/AllTools";
import { getPosts } from "@/utils/hashnode";
import { SITE_URL } from "@/utils/site";

// Rebuilt on the same cadence as the blog feed.
export const revalidate = 3600;

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools", changeFrequency: "monthly", priority: 0.7 },
  { path: "/quote", changeFrequency: "daily", priority: 0.3 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
] satisfies {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  const tools: MetadataRoute.Sitemap = AllTools.map((tool) => ({
    url: `${SITE_URL}${tool.slug}`,
    lastModified: new Date(tool.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    posts = (await getPosts()).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (err) {
    // A feed outage shouldn't drop every other page from the sitemap.
    console.error("Error adding blog posts to the sitemap:", err);
  }

  return [...pages, ...tools, ...posts];
}
