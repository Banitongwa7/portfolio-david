import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import type { PostType } from "@/types/types";
import { TOPICS, langOf, topicOf } from "@/utils/blogMeta";
import { formatShortDate } from "@/utils/format";
import s from "./home.module.css";

export default function Writing({ posts }: { posts: PostType[] }) {
  return (
    <section id="writing" className="sec" style={{ paddingTop: 0 }} aria-labelledby="writing-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="tag">Writing</span>
            <h2 id="writing-title" className="h2">
              Notes on tools, dev and AI
            </h2>
          </div>
          <Link className="btn btn-line" href="/blog">
            All articles
          </Link>
        </div>
        <ul className={s.posts}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link className={s.post} href={`/blog/${post.slug}`}>
                <span className={s.postTag}>{TOPICS[topicOf(post)]}</span>
                <span className={s.postTitle} lang={langOf(post)}>
                  {post.title}
                </span>
                <span className={s.postMeta}>
                  <time dateTime={post.publishedAt}>{formatShortDate(post.publishedAt)}</time>
                  <span>{post.readTimeInMinutes} min read</span>
                </span>
                <span className={s.postArrow} aria-hidden="true">
                  <HiArrowUpRight size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
