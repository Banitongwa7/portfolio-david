import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import ProgressBar from "./progressbar";
import { IoIosTime } from "react-icons/io";
import type { Metadata } from "next";
import { getPost } from "@/utils/hashnode";
import Parallax from "@/components/motion/Parallax";

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

export default async function PostArticle({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const article = await getPost((await params).blogSlug);

  if (!article) {
    notFound();
  }

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <ProgressBar>
      <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <Link href="/blog" className="text-link text-sm">
          <HiArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to blog
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Published{" "}
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </p>
            <span aria-hidden="true">·</span>
            <p className="flex items-center gap-1.5">
              <IoIosTime aria-hidden="true" />
              {article.readTimeInMinutes} min read
            </p>
          </div>
        </header>

        {article.coverImage && (
          <div className="relative mt-10 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <Parallax className="absolute inset-x-0 -inset-y-[6%]">
              <Image
                src={article.coverImage}
                alt=""
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                priority={true}
                className="object-cover"
              />
            </Parallax>
          </div>
        )}

        <div
          className="prose prose-slate mt-10 max-w-none md:prose-lg dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-accent-700 dark:prose-a:text-accent-400 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{
            __html: article.html,
          }}
        />

        <ul
          aria-label="Tags"
          className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-8 dark:border-slate-800"
        >
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              #{tag}
            </li>
          ))}
        </ul>
      </article>
    </ProgressBar>
  );
}
