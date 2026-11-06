import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import AllTools from "@/data/AllTools";
import { categoryOf } from "@/data/toolCategories";
import PageHead from "@/components/site/PageHead";
import EndCta from "@/components/site/EndCta";
import ToolsExplorer from "@/components/tools/ToolsExplorer";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function Tools() {
  const tools = [...AllTools]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((tool) => ({
      name: tool.name,
      description: tool.description,
      href: tool.slug,
      date: formatDate(tool.publishedAt),
      category: categoryOf(tool.slug),
      icon: tool.icon,
    }));

  return (
    <>
      <PageHead
        tag="Tools"
        title={
          <>
            Free tools for <span className="serif">everyday work</span>
          </>
        }
        text={`${tools.length} small browser tools I built to support you on your professional journey. Free to use, right in your browser.`}
      />
      <ToolsExplorer tools={tools} />
      <EndCta title="Have an idea for a tool?" text="Tell me what would save you time. Good ideas end up here.">
        <Link className="btn btn-neon" href="/contact">
          Send a message
          <span className="ic">
            <HiArrowUpRight aria-hidden="true" />
          </span>
        </Link>
      </EndCta>
    </>
  );
}
