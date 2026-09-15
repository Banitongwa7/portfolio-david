import type { PostType } from "@/types/types";

// The Hashnode GraphQL API requires a Pro plan since May 2026, so posts are
// read from the publication's public RSS feed, which includes the full HTML.
const BLOG_URL = "https://daviddb.hashnode.dev";
const REVALIDATE_SECONDS = 3600;
const WORDS_PER_MINUTE = 200;

const XML_ENTITIES: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&amp;": "&",
};

// CDATA content is returned untouched: decoding it would turn escaped code
// samples such as `&lt;div&gt;` into real HTML tags.
function decodeValue(raw: string): string {
  const cdata = raw.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  if (cdata) return cdata[1];
  return raw.trim().replace(/&(lt|gt|quot|apos|amp);/g, (entity) => XML_ENTITIES[entity]);
}

function readTags(xml: string, tag: string): string[] {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "g");
  return [...xml.matchAll(pattern)].map((match) => decodeValue(match[1]));
}

function readTag(xml: string, tag: string): string {
  return readTags(xml, tag)[0] ?? "";
}

function estimateReadTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parseItem(item: string): PostType {
  const html = readTag(item, "content:encoded");
  // Drop the article body so tags inside it can't be mistaken for feed fields.
  const meta = item.replace(/<content:encoded>[\s\S]*?<\/content:encoded>/, "");
  const link = readTag(meta, "link");

  return {
    slug: new URL(link).pathname.replace(/^\/+|\/+$/g, ""),
    title: readTag(meta, "title"),
    brief: readTag(meta, "description"),
    coverImage: meta.match(/<enclosure[^>]*\surl="([^"]+)"/)?.[1] ?? null,
    tags: readTags(meta, "category"),
    author: readTag(meta, "dc:creator"),
    publishedAt: new Date(readTag(meta, "pubDate")).toISOString(),
    readTimeInMinutes: estimateReadTime(html),
    html,
  };
}

export async function getPosts(): Promise<PostType[]> {
  const res = await fetch(`${BLOG_URL}/rss.xml`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Hashnode RSS feed: ${res.status}`);
  }

  const xml = await res.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) =>
    parseItem(match[1])
  );
}

export async function getPost(slug: string): Promise<PostType | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
