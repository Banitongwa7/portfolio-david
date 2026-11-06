"use client";

import { useState } from "react";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { TOOL_CATEGORIES, type ToolCategory } from "@/data/toolCategories";
import s from "./tools.module.css";

export type ToolListItem = {
  name: string;
  description: string;
  href: string;
  date: string;
  category: ToolCategory;
  icon: React.ReactNode;
};

type Filter = "all" | ToolCategory;

// Tools arrive sorted newest first; the newest one is featured while every
// category is shown.
export default function ToolsExplorer({ tools }: { tools: ToolListItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const list = tools.filter((t) => filter === "all" || t.category === filter);
  const filters: Filter[] = ["all", ...(Object.keys(TOOL_CATEGORIES) as ToolCategory[])];

  return (
    <section className="sec" style={{ paddingTop: 0 }} aria-label="All tools">
      <div className="wrap">
        <div className={s.toolbar}>
          <div className={s.chips} role="group" aria-label="Filter by use">
            {filters.map((f) => (
              <button key={f} type="button" className="fchip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : TOOL_CATEGORIES[f]}
                <small>{tools.filter((t) => f === "all" || t.category === f).length}</small>
              </button>
            ))}
          </div>
          <p className={s.sort} aria-live="polite">
            {list.length} tools, newest first
          </p>
        </div>
        <ul className={s.grid}>
          {list.map((tool, i) => {
            const featured = filter === "all" && i === 0;
            return (
              <li key={tool.href} className={featured ? s.featLi : undefined}>
                <Link className={featured ? `${s.tool} ${s.feat}` : s.tool} href={tool.href}>
                  <div className={s.copy}>
                    <div className={s.top}>
                      <span className={s.ic} aria-hidden="true">
                        {tool.icon}
                      </span>
                      {i === 0 && <span className={s.new}>New</span>}
                    </div>
                    <h2>{tool.name}</h2>
                    <p>{tool.description}</p>
                    <span className={s.meta}>
                      <span>
                        {TOOL_CATEGORIES[tool.category]}, {tool.date}
                      </span>
                      <span className={s.open}>
                        Open tool
                        <HiArrowUpRight aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                  {featured && tool.href === "/tools/live-poll" && (
                    <div className={s.poll} aria-hidden="true">
                      <p>Which framework for the next sprint?</p>
                      <div className={s.opt}>
                        <span>Next.js</span>
                        <span>48%</span>
                        <i>
                          <b style={{ width: "48%" }} />
                        </i>
                      </div>
                      <div className={s.opt}>
                        <span>React Native</span>
                        <span>31%</span>
                        <i>
                          <b style={{ width: "31%" }} />
                        </i>
                      </div>
                      <div className={s.opt}>
                        <span>Power Apps</span>
                        <span>21%</span>
                        <i>
                          <b style={{ width: "21%" }} />
                        </i>
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
