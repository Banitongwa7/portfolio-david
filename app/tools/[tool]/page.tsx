import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import AllTools from "@/data/AllTools";
import { categoryOf } from "@/data/toolCategories";
import ToolView from "@/components/tools/ToolView";
import s from "@/components/tools/tools.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const slug = (await params).tool;
  const tool = AllTools.find((tool) => tool.slug === `/tools/${slug}`);

  // The page itself answers with a 404; no share card for a missing tool.
  if (!tool) {
    return { title: "Tool not found" };
  }

  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: tool.name,
      description: tool.description,
      images: [{ url: tool.coverImage, width: 1000, height: 500, alt: tool.name }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

// These tools render their own <h1>; the others get a visually hidden one.
const HAS_OWN_H1 = new Set([
  "/tools/lofi-space",
  "/tools/qr-code-generator",
  "/tools/sticky-notes",
  "/tools/webRTC-data-transfert",
  "/tools/live-poll",
]);

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

  // Suggest tools from the same family first, then the newest others.
  const others = AllTools.filter((t) => t.slug !== tool.slug).sort(
    (a, b) =>
      Number(categoryOf(b.slug) === categoryOf(tool.slug)) - Number(categoryOf(a.slug) === categoryOf(tool.slug)) ||
      b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        {/* Each tool renders its own title, so this is only a way back out. */}
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <Link href="/tools">
            <HiArrowLeft aria-hidden="true" />
            All tools
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{tool.name}</span>
          <span aria-hidden="true">/</span>
          <span>
            Published <time dateTime={tool.publishedAt}>{formatDate(tool.publishedAt)}</time>
          </span>
        </nav>

        {!HAS_OWN_H1.has(tool.slug) && <h1 className="sr">{tool.name}</h1>}
        <div className={s.bench}>
          <ToolView slug={tool.slug} />
        </div>

        <h2 className="h2" style={{ marginTop: 72, fontSize: 28 }}>
          More tools
        </h2>
        <div className={s.more}>
          {others.slice(0, 3).map((t) => (
            <Link key={t.id} href={t.slug}>
              <span className={s.ic} aria-hidden="true">
                {t.icon}
              </span>
              <span>
                <strong>{t.name}</strong>
                <span className={s.text}>{t.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
