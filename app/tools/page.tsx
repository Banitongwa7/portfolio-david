"use client";

import React, { useState } from "react";
import CardTool from "@/components/cards/CardTool";
import AllTools from "@/data/AllTools";
import { FaPlusCircle } from "react-icons/fa";

export default function Tools() {
  const TOOLS_PER_LOAD = 9;
  const TOOLS_TO_ADD = 6;
  const [visibleTools, setVisibleTools] = useState(TOOLS_PER_LOAD);
  const totalTools = AllTools.length;
  const toolsToShow = AllTools.slice(0, visibleTools);
  const hasMoreTools = visibleTools < totalTools;
  const handleLoadMore = () => {
    setVisibleTools((prevCount) =>
      Math.min(prevCount + TOOLS_TO_ADD, totalTools)
    );
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="mx-auto max-w-4xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Tools to Empower Your Journey
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-3 md:mt-4">
          {
            "Here are some tools I've created to support you on your professional journey."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl justify-items-center mx-auto mb-10">
        {toolsToShow.map((item) => (
          <CardTool key={item.id} item={item} />
        ))}
      </div>

      {hasMoreTools && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="
              px-8 py-3 text-lg font-semibold rounded-lg shadow-xl transition duration-300 ease-in-out
              flex items-center justify-center mx-auto gap-2
              bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 hover:shadow-indigo-500/50 dark:hover:shadow-cyan-400/50
            "
          >
            <FaPlusCircle className="w-5 h-5" />
            Load More Tools
          </button>
        </div>
      )}

      {!hasMoreTools && totalTools > TOOLS_PER_LOAD && (
        <div className="text-center mt-10">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {"That's all the tools available for now!"}
          </p>
        </div>
      )}
    </div>
  );
}
