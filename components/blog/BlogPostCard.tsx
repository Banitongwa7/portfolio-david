import Image from "next/image";
import Link from "next/link";
import type { PostType } from "@/types/types";

const MAX_TAGS = 3;

interface BlogPostCardProps {
  post: PostType;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <li className="card group relative flex flex-col overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
        <Image
          src={post.coverImage || "/assets/icon.png"}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>{" "}
          · {post.readTimeInMinutes} min read
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-accent-700 dark:text-slate-100 dark:group-hover:text-accent-400">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {post.brief}
        </p>

        <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4">
          {post.tags.slice(0, MAX_TAGS).map((tag) => (
            <li
              key={tag}
              className="text-xs font-medium text-accent-700 dark:text-accent-400"
            >
              #{tag}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
