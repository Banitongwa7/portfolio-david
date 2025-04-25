import React from "react";
import { GoRocket } from "react-icons/go";

export default function CardTool() {
  return (
    <article className="rounded-xl border-2 border-green-700 bg-white dark:bg-gray-800 dark:border-green-600 shadow-md shadow-gray-300 dark:shadow-gray-700 transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-gray-700">
    <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
      <a href="#" className="block shrink-0">
        <GoRocket className="size-14 w-10 h-10 dark:text-emerald-500" />
      </a>

      <div>
        <h3 className="font-medium sm:text-lg">
          <a href="#" className="hover:underline dark:text-white"> 
            Question about Livewire Rendering-3 and Alpine JS 
          </a>
        </h3>

        <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, accusantium temporibus
          iure delectus ut totam natus nesciunt ex? Ducimus, enim.
        </p>

        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>

            <p className="text-xs dark:text-gray-400">14 comments</p>
          </div>

          <span className="hidden sm:block dark:text-gray-400" aria-hidden="true">&middot;</span>

          <p className="hidden sm:block sm:text-xs sm:text-gray-500 dark:text-gray-400">
            Posted by
            <a href="#" className="font-medium underline hover:text-gray-700 dark:hover:text-gray-300"> John </a>
          </p>
        </div>
      </div>
    </div>

    <div className="flex justify-end">
      <strong className="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-green-700 dark:bg-green-700 px-3 py-1.5 text-white">

        <span className="text-[10px] font-medium sm:text-xs">#0001</span>
      </strong>
    </div>
  </article>
  );
}
