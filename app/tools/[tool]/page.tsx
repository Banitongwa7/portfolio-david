import React from "react";
import type { Metadata } from "next";
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
    },
  };
}

export default async function DisplayTool({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const slug = (await params).tool;

  console.log("Tool slug : ", slug)

  return (
    <>
      {AllTools.find((tool) => tool.slug === `/tools/${slug}`)?.component || (
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Tool not found</h2>
        </div>
      )}
    </>
  );
}
