import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import ProgressBar from "./progressbar";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/utils/hashnode";
import { LANGS, TOPICS, langOf, topicOf } from "@/utils/blogMeta";
import { formatLongDate } from "@/utils/format";
import { SITE_URL } from "@/utils/site";
import Parallax from "@/components/motion/Parallax";
import ShareBar from "@/components/blog/ShareBar";
import s from "@/components/blog/article.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}): Promise<Metadata> {
  const article = await getPost((await params).blogSlug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.brief,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.brief,
      publishedTime: article.publishedAt,
      // The share image comes from the sibling opengraph-image.tsx.
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const plainText = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();

// Gives every h2 an id (keeping one the feed already set) and returns the
// table of contents built from them.
function withAnchors(html: string) {
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs: string, inner: string) => {
    const text = plainText(inner);
    const existing = attrs.match(/\sid="([^"]+)"/);
    let id = existing?.[1] ?? (slugify(text) || "section");
    if (!existing) {
      while (used.has(id)) id = `${id}-2`;
    }
    used.add(id);
    toc.push({ id, text });
    return existing ? match : `<h2${attrs} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export default async function PostArticle({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const slug = (await params).blogSlug;
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const article = posts[index];

  if (!article) {
    notFound();
  }

  const { html, toc } = withAnchors(article.html);
  const lang = langOf(article);
  const topic = topicOf(article);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const published = formatLongDate(article.publishedAt);

  const tocList = (
    <ol>
      {toc.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} lang={lang}>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <ProgressBar>
      <article className={s.art}>
        {toc.length > 0 && (
          <nav className={s.toc} aria-label="On this page">
            <h2>On this page</h2>
            {tocList}
            <p className={s.tocMeta}>
              Published {published}
              <br />
              {article.readTimeInMinutes} min read, in {LANGS[lang]}
            </p>
          </nav>
        )}

        <header className={s.head}>
          <Link href="/blog" className="text-link">
            <HiArrowLeft aria-hidden="true" />
            Back to blog
          </Link>
          {article.tags.length > 0 && (
            <ul className={s.tags} aria-label="Tags">
              {article.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          <h1 lang={lang}>{article.title}</h1>
          <p className={s.meta}>
            <span>
              By <strong>{article.author || "David B."}</strong>
            </span>
            <span>
              Published <time dateTime={article.publishedAt}>{published}</time>
            </span>
            <span>{article.readTimeInMinutes} min read</span>
            <span>In {LANGS[lang]}</span>
          </p>
        </header>

        {toc.length > 0 && (
          <details className={s.tocM}>
            <summary>On this page</summary>
            {tocList}
          </details>
        )}

        <div className={s.cover} aria-hidden="true">
          {article.coverImage ? (
            <Parallax className="absolute inset-x-0 -inset-y-[6%]">
              <Image src={article.coverImage} alt="" fill sizes="(min-width: 768px) 720px, 100vw" priority={true} />
            </Parallax>
          ) : (
            <span className={s.coverWord}>{TOPICS[topic]}</span>
          )}
        </div>

        <div
          lang={lang}
          className={`${s.prose} prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#160F2E] prose-p:text-[#2C2450] prose-li:text-[#2C2450] prose-li:marker:text-[#E8479B] prose-strong:text-[#160F2E] prose-a:text-[#6A45F0] prose-img:rounded-2xl prose-pre:rounded-2xl prose-blockquote:border-l-[#E8479B]`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <footer className={s.foot}>
          <ShareBar url={`${SITE_URL}/blog/${article.slug}`} title={article.title} />
          <div className={s.author}>
            <span className={s.mono} aria-hidden="true">
              D
            </span>
            <div>
              <strong>Written by David Banitongwa</strong>
              <p>Software engineer and Microsoft Power Platform developer. Writes about tools, dev and AI.</p>
            </div>
            <Link className="round-link" href="/about" aria-label="About David">
              <HiArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          {(older || newer) && (
            <nav className={s.pn} aria-label="More articles">
              {older && (
                <Link href={`/blog/${older.slug}`}>
                  <span>Previous article</span>
                  <strong lang={langOf(older)}>{older.title}</strong>
                </Link>
              )}
              {newer && (
                <Link className={s.next} href={`/blog/${newer.slug}`}>
                  <span>Next article</span>
                  <strong lang={langOf(newer)}>{newer.title}</strong>
                </Link>
              )}
            </nav>
          )}
        </footer>
      </article>
    </ProgressBar>
  );
}
