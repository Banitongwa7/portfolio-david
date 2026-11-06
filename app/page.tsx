import type { PostType } from "@/types/types";
import AllTools from "@/data/AllTools";
import { TOOL_CATEGORIES, categoryOf } from "@/data/toolCategories";
import { getPosts } from "@/utils/hashnode";
import Hero from "@/components/home/Hero";
import AboutBento from "@/components/home/AboutBento";
import WorkStack from "@/components/home/WorkStack";
import JourneyGrid from "@/components/home/JourneyGrid";
import Process from "@/components/home/Process";
import ToolsPager from "@/components/home/ToolsPager";
import Writing from "@/components/home/Writing";
import Faq from "@/components/home/Faq";

const LATEST_POSTS = 3;

// Sections alternate light and dark from top to bottom.
export default async function Home() {
  let latestPosts: PostType[] = [];

  try {
    latestPosts = (await getPosts()).slice(0, LATEST_POSTS);
  } catch (err) {
    // The home page stays usable without the articles section.
    console.error("Error fetching blog posts:", err);
  }

  const tools = AllTools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    href: tool.slug,
    category: TOOL_CATEGORIES[categoryOf(tool.slug)],
    icon: tool.icon,
  }));

  return (
    <>
      <Hero />
      <AboutBento />
      <WorkStack />
      <JourneyGrid />
      <Process />
      <ToolsPager tools={tools} />
      {latestPosts.length > 0 && <Writing posts={latestPosts} />}
      <Faq />
    </>
  );
}
