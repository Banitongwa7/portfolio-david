import React from "react";
import CardTool from "@/components/alltools/CardTool";
import AllTools from "@/data/AllTools";

export default function Tools() {
  return (
    <div className="min-h-screen py-16 px-4">
      
      <div className="mx-auto max-w-4xl text-center mb-12">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Tools to Empower Your Journey
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-3 md:mt-4">
          {"Here are some tools I've created to support you on your professional journey."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl justify-items-center mx-auto mb-10">
        {AllTools.map((item) => (
          <CardTool key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}