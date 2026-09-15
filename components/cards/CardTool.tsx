import React from "react";
import type { ToolType } from "@/types/types";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export default function CardTool({ item }: { item: ToolType }) {
  return (
    <li className="card group relative flex flex-col p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-2xl text-accent-600 dark:text-accent-400"
        >
          {item.icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 transition-colors group-hover:text-accent-700 dark:text-slate-100 dark:group-hover:text-accent-400">
            <Link
              href={item.slug}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {item.name}
            </Link>
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <p>
          Published <time dateTime={item.publishedAt}>{item.publishedAt}</time>
        </p>
        <span className="inline-flex items-center gap-1 font-semibold text-accent-700 dark:text-accent-400">
          Open tool
          <HiArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </li>
  );
}
