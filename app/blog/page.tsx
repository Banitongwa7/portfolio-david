import type { PostType } from "@/types/types";
import BlogPostCard from "@/components/blog/BlogPostCard";
import PageHeader from "@/components/pageheader/PageHeader";
import { getPosts } from "@/utils/hashnode";
import Image from "next/image";
import Link from "next/link";

export default async function Blog() {
  let allPosts: PostType[];

  try {
    allPosts = await getPosts();
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-24 text-center sm:px-6">
        <p className="text-xl text-red-600 dark:text-red-400 md:text-2xl">
          Error loading articles
        </p>
      </section>
    );
  }

  if (allPosts.length === 0) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-24 text-center sm:px-6">
        <p className="text-xl text-slate-600 dark:text-slate-400 md:text-2xl">
          No articles found at this time. Check back soon for new content!
        </p>
      </section>
    );
  }

  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <PageHeader
        eyebrow="Blog"
        title="All My Blog Posts"
        description="Here are all my blog posts. I hope you find them helpful! If you do, feel free to share them with your friends."
      />

      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Last Article
      </h2>
      <article className="card group relative mb-16 grid grid-cols-1 overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700 md:grid-cols-2">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 md:aspect-auto md:min-h-80">
          <Image
            src={featuredPost.coverImage || "/assets/icon.png"}
            alt=""
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            priority={true}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-400 sm:text-sm">
            {featuredPost.tags[0] || "Featured"} ·{" "}
            {featuredPost.readTimeInMinutes} min read
          </p>
          <h3 className="text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-accent-700 dark:text-slate-100 dark:group-hover:text-accent-400 sm:text-3xl">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {featuredPost.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-base text-slate-600 dark:text-slate-400">
            {featuredPost.brief}
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            By {featuredPost.author} · {formatDate(featuredPost.publishedAt)}
          </p>
        </div>
      </article>

      {recentPosts.length > 0 && (
        <>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            More Articles
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
