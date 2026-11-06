"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { LANGS, TOPICS, type Lang, type Topic } from "@/utils/blogMeta";
import s from "./blog.module.css";

export type BlogListItem = {
  slug: string;
  title: string;
  brief: string;
  coverImage: string | null;
  publishedAt: string;
  date: string;
  readTime: number;
  topic: Topic;
  lang: Lang;
};

type TopicFilter = "all" | Topic;
type LangFilter = "all" | Lang;

// The Hashnode cover when the article has one, a typographic cover otherwise.
function Cover({ post, large = false }: { post: BlogListItem; large?: boolean }) {
  return (
    <div className={`${s.cover} ${post.coverImage ? s.photo : s[post.topic]}`} aria-hidden="true">
      {post.coverImage ? (
        <Image src={post.coverImage} alt="" fill sizes={large ? "(min-width: 1080px) 640px, 100vw" : "(min-width: 1080px) 380px, 100vw"} />
      ) : (
        <span className={s.coverWord}>{TOPICS[post.topic]}</span>
      )}
      <span className={s.badges}>
        {post.coverImage && <span>{TOPICS[post.topic]}</span>}
        <span>{LANGS[post.lang]}</span>
      </span>
    </div>
  );
}

export default function BlogExplorer({ posts }: { posts: BlogListItem[] }) {
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [lang, setLang] = useState<LangFilter>("all");

  const inLang = (p: BlogListItem) => lang === "all" || p.lang === lang;
  const inTopic = (p: BlogListItem) => topic === "all" || p.topic === topic;
  const isDefault = topic === "all" && lang === "all";
  const matches = posts.filter((p) => inLang(p) && inTopic(p));
  const [featured] = posts;
  const list = isDefault ? matches.slice(1) : matches;

  const topics = (["all", ...Object.keys(TOPICS)] as TopicFilter[]).filter(
    (t) => t === "all" || posts.some((p) => p.topic === t)
  );
  const langs: LangFilter[] = ["all", "fr", "en"];

  return (
    <section className="sec" style={{ paddingTop: 0 }} aria-label="Articles">
      <div className="wrap">
        {isDefault && featured && (
          <article className={s.feat}>
            <Cover post={featured} large />
            <div className={s.featBody}>
              <p className={s.kicker}>
                <strong>Latest article</strong>
                <time dateTime={featured.publishedAt}>{featured.date}</time>
                <span>{featured.readTime} min read</span>
              </p>
              <h2 lang={featured.lang}>
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className={s.brief} lang={featured.lang}>
                {featured.brief}
              </p>
              <span className="text-link" aria-hidden="true">
                Read article
                <HiArrowRight />
              </span>
            </div>
          </article>
        )}

        <div className={s.toolbar}>
          <div className={s.chips} role="group" aria-label="Filter by topic">
            {topics.map((t) => (
              <button key={t} type="button" className="fchip" aria-pressed={topic === t} onClick={() => setTopic(t)}>
                {t === "all" ? "All topics" : TOPICS[t]}
                <small>{posts.filter((p) => (t === "all" || p.topic === t) && inLang(p)).length}</small>
              </button>
            ))}
          </div>
          <div className={s.seg} role="group" aria-label="Filter by language">
            {langs.map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l === "all" ? "All languages" : LANGS[l]}
              </button>
            ))}
          </div>
        </div>
        <p className={s.count} aria-live="polite">
          Showing <strong>{matches.length}</strong> of {posts.length} articles
        </p>

        {matches.length > 0 ? (
          <ul className={s.grid}>
            {list.map((post) => (
              <li key={post.slug}>
                <Link className={s.post} href={`/blog/${post.slug}`}>
                  <Cover post={post} />
                  <div className={s.postBody}>
                    <p className={s.meta}>
                      <time dateTime={post.publishedAt}>{post.date}</time>
                      <span>{post.readTime} min read</span>
                    </p>
                    <h3 lang={post.lang}>{post.title}</h3>
                    <p className={s.postBrief} lang={post.lang}>
                      {post.brief}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <h3>No article matches these filters</h3>
            <p>
              There is no {topic === "all" ? "" : `${TOPICS[topic]} `}article in{" "}
              {lang === "all" ? "any language" : LANGS[lang]} yet. Try another topic or language.
            </p>
            <button
              className="btn btn-line"
              type="button"
              onClick={() => {
                setTopic("all");
                setLang("all");
              }}
            >
              Show all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
