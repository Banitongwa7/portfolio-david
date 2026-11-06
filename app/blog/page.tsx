import type { PostType } from "@/types/types";
import { getPosts } from "@/utils/hashnode";
import { langOf, topicOf } from "@/utils/blogMeta";
import { formatShortDate } from "@/utils/format";
import PageHead from "@/components/site/PageHead";
import EndCta from "@/components/site/EndCta";
import BlogExplorer from "@/components/blog/BlogExplorer";
import AllLinks from "@/data/AllLinks";
import { HiArrowUpRight } from "react-icons/hi2";
import s from "@/components/blog/blog.module.css";

export default async function Blog() {
  let allPosts: PostType[] | null = null;

  try {
    allPosts = await getPosts();
  } catch (err) {
    console.error("Error fetching blog posts:", err);
  }

  const years = allPosts?.map((p) => new Date(p.publishedAt).getUTCFullYear()) ?? [];
  const since = years.length ? Math.min(...years) : null;

  return (
    <>
      <PageHead
        tag="Blog"
        title={
          <>
            Notes on tools, dev <span className="serif">and AI</span>
          </>
        }
        text={
          allPosts?.length
            ? `Articles in French and English about developer tools, the Microsoft ecosystem and AI. ${allPosts.length} articles since ${since}.`
            : "Articles in French and English about developer tools, the Microsoft ecosystem and AI."
        }
      />

      {allPosts === null && (
        <section className={s.state}>
          <div className="wrap">
            <div className="empty" role="alert">
              <h3>The articles could not be loaded</h3>
              <p>The blog feed did not answer. Reload the page, or read the articles directly on Hashnode.</p>
              <a className="btn btn-line" href={AllLinks.hashnode} target="_blank" rel="noopener noreferrer">
                Open the blog on Hashnode
              </a>
            </div>
          </div>
        </section>
      )}

      {allPosts?.length === 0 && (
        <section className={s.state}>
          <div className="wrap">
            <div className="empty">
              <h3>No articles yet</h3>
              <p>New posts appear here as soon as they are published. Check back soon.</p>
            </div>
          </div>
        </section>
      )}

      {allPosts && allPosts.length > 0 && (
        <BlogExplorer
          posts={allPosts.map((post) => ({
            slug: post.slug,
            title: post.title,
            brief: post.brief,
            coverImage: post.coverImage,
            publishedAt: post.publishedAt,
            date: formatShortDate(post.publishedAt),
            readTime: post.readTimeInMinutes,
            topic: topicOf(post),
            lang: langOf(post),
          }))}
        />
      )}

      <EndCta title="Follow new articles" text="New posts appear first on Hashnode, in French or English.">
        <a className="btn btn-neon" href={AllLinks.hashnode} target="_blank" rel="noopener noreferrer">
          Follow on Hashnode<span className="sr"> (opens in a new tab)</span>
          <span className="ic">
            <HiArrowUpRight aria-hidden="true" />
          </span>
        </a>
      </EndCta>
    </>
  );
}
