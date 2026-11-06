"use client";

import { useState } from "react";
import Link from "next/link";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import s from "./home.module.css";

export type ToolCard = {
  name: string;
  description: string;
  href: string;
  category: string;
  icon: React.ReactNode;
};

const PER_PAGE = 4;

// Four tools at a time; the new set fades in when the page changes.
export default function ToolsPager({ tools }: { tools: ToolCard[] }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(tools.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = tools.slice(start, start + PER_PAGE);

  return (
    <section id="tools" className="sec" aria-labelledby="tools-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="tag">Tools</span>
            <h2 id="tools-title" className="h2">
              {tools.length} free tools, built to try ideas
            </h2>
            <p className="lead">Small browser tools you can use right now, from a lofi player to live polls.</p>
          </div>
          <div className={s.labCtrl}>
            <button
              type="button"
              className="round"
              aria-label="Previous tools"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
            >
              <HiChevronLeft size={18} aria-hidden="true" />
            </button>
            <p className={s.labPos} aria-live="polite">
              {start + 1}–{start + visible.length} of {tools.length}
            </p>
            <button
              type="button"
              className="round"
              aria-label="Next tools"
              disabled={page === pages - 1}
              onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
            >
              <HiChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <ul key={page} className={`${s.labGrid} ${page % 2 ? s.swapB : s.swapA}`}>
          {visible.map((tool) => (
            <li key={tool.href}>
              <Link className={s.tool} href={tool.href}>
                <span className={s.toolIc} aria-hidden="true">
                  {tool.icon}
                </span>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className={s.toolMeta}>
                  <span>{tool.category}</span>
                  <span className={s.toolOpen}>
                    Open tool
                    <HiArrowUpRight aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
