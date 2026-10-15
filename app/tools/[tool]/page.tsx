import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import AllTools from "@/data/AllTools";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const slug = (await params).tool;
  const tool = AllTools.find((tool) => tool.slug === `/tools/${slug}`);

  return {
    title: `${ tool?.name || "Tool Not Found"}`,
    description: `${tool?.description || "The requested tool could not be found."}`,
    openGraph: {
      title: `${ tool?.name || "Tool Not Found"}`,
      description: `${tool?.description || "The requested tool could not be found."}`,
      images: [
        {
            url: tool?.coverImage || "",
            width: 1000,
            height: 500,
            alt: tool?.name || "Tool Not Found",
        }
      ]
    },
  };
}

export default async function DisplayTool({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const slug = (await params).tool;
  const tool = AllTools.find((tool) => tool.slug === `/tools/${slug}`);

  if (!tool) {
    notFound();
  }

  return (
    <>
      {/* Each tool renders its own title, so this is only a way back out. */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
          <Link href="/tools" className="text-link group">
            <HiArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
            All tools
          </Link>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">
            /
          </span>
          <span className="text-slate-600 dark:text-slate-400">{tool.name}</span>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">
            ·
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            Published <time dateTime={tool.publishedAt}>{tool.publishedAt}</time>
          </span>
        </nav>
      </div>
      {tool.component}
    </>
  );
}
