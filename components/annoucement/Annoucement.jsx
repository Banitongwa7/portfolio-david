import React from "react";
import { HiRocketLaunch } from "react-icons/hi2";

export default function Annoucement() {
  return (
    <div className="bg-gradient-to-r from-red-500 to-blue-800">
      <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-center">
        <p className="me-2 font-mono inline-block text-white">
          My personal portfolio is launched 
        </p>
        <HiRocketLaunch className="text-white text-2xl animate-[bounce_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
