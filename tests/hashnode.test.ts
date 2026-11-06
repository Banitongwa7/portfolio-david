import { afterEach, describe, expect, it, vi } from "vitest";
import { getPost, getPosts } from "@/utils/hashnode";

const item = (fields: string) => `<item>${fields}</item>`;

const GOOD = item(`
  <title><![CDATA[Les meilleurs outils]]></title>
  <link>https://daviddb.hashnode.dev/les-meilleurs-outils</link>
  <description>Short &amp; sweet</description>
  <category>Productivity</category>
  <dc:creator>David B.</dc:creator>
  <pubDate>Sun, 07 Dec 2025 10:00:00 GMT</pubDate>
  <enclosure url="https://cdn.hashnode.com/cover.png" type="image/png" />
  <content:encoded><![CDATA[<h2>Intro</h2><p>Use <code>&lt;div&gt;</code> wisely.</p><link>not-a-field</link>]]></content:encoded>
`);

const NO_LINK = item(`
  <title>Broken</title>
  <pubDate>Sun, 07 Dec 2025 10:00:00 GMT</pubDate>
  <content:encoded><![CDATA[<p>x</p>]]></content:encoded>
`);

const BAD_DATE = item(`
  <title>Bad date</title>
  <link>https://daviddb.hashnode.dev/bad-date</link>
  <pubDate>not a date</pubDate>
  <content:encoded><![CDATA[<p>x</p>]]></content:encoded>
`);

function serveFeed(xml: string, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(`<rss><channel>${xml}</channel></rss>`, { status }))
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getPosts", () => {
  it("reads every field of a post", async () => {
    serveFeed(GOOD);
    const [post] = await getPosts();
    expect(post).toMatchObject({
      slug: "les-meilleurs-outils",
      title: "Les meilleurs outils",
      brief: "Short & sweet",
      coverImage: "https://cdn.hashnode.com/cover.png",
      tags: ["Productivity"],
      author: "David B.",
      publishedAt: "2025-12-07T10:00:00.000Z",
      readTimeInMinutes: 1,
    });
    // CDATA bodies stay as written: escaped code samples are not unescaped.
    expect(post.html).toContain("<code>&lt;div&gt;</code>");
  });

  it("skips broken items instead of failing the whole blog", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    serveFeed(NO_LINK + GOOD + BAD_DATE);
    const posts = await getPosts();
    expect(posts.map((p) => p.slug)).toEqual(["les-meilleurs-outils"]);
  });

  it("throws when the feed is down, so pages can show their error state", async () => {
    serveFeed("", 503);
    await expect(getPosts()).rejects.toThrow("503");
  });
});

describe("getPost", () => {
  it("finds a post by slug, or returns null", async () => {
    serveFeed(GOOD);
    expect((await getPost("les-meilleurs-outils"))?.title).toBe("Les meilleurs outils");
    expect(await getPost("missing")).toBeNull();
  });
});
