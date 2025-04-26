import React from "react";
import CardTool from "@/components/alltools/CardTool";
import AllTools from "@/data/AllTools";

export default function Tools() {
  return (
    <div className="min-h-screen">
      <h2 className="text-center text-3xl font-bold text-white mt-10">
        Tools to Empower Your Journey
      </h2>
      <p className="text-center text-gray-400 mt-4 mb-10">
      {"Here are some tools I've created to support you on your professional journey."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:w-[80%] justify-items-center mx-auto my-10">
        {AllTools.map((item) => (
          <CardTool key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
