import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return <>{tool.component}</>;
}
