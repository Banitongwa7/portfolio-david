import React from "react";
import type { ToolType } from "@/types/types";
import Link from "next/link";
import { PiCalendarCheckFill } from "react-icons/pi";

export default function CardTool({ item }: { item: ToolType }) {
  return (
    <Link
      href={item.slug}
      className="rounded-xl border-2 w-full border-green-700 bg-white dark:bg-gray-800 dark:border-green-600 shadow-lg shadow-gray-300/50 dark:shadow-gray-700/50 transition-transform duration-300 hover:scale-[1.03] group"
    >
      <div className="flex items-start gap-3 sm:gap-4 p-4 lg:p-6 w-full">
        <div className="block shrink-0 text-3xl sm:text-4xl lg:text-5xl dark:text-emerald-500 mt-0.5">
          {item.icon}
        </div>

        <div className="w-full">
          <h3 className="font-bold text-base sm:text-lg dark:text-white transition-colors duration-200 group-hover:text-green-700 dark:group-hover:text-green-500">
            {item.name}
          </h3>
          <p className="line-clamp-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">
            {item.description}
          </p>

          <div className="mt-3 sm:flex sm:items-center sm:gap-2 space-y-1 sm:space-y-0">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <PiCalendarCheckFill className="w-4 h-4" />
              <p className="text-xs dark:text-gray-400">{item.publishedAt}</p>
            </div>
            <span
              className="hidden sm:block dark:text-gray-400"
              aria-hidden="true"
            >
              &middot;
            </span>

            <p className="text-xs sm:text-xs text-gray-500 dark:text-gray-400">
              Developed by {" "}
              <span className="font-medium underline hover:text-gray-700 dark:hover:text-gray-300">
                {item.developer}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <strong className="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-green-700 dark:bg-green-700 px-3 py-1.5 text-white">
          <span className="text-[10px] font-medium sm:text-xs">#{item.id}</span>
        </strong>
      </div>
    </Link>
  );
}
