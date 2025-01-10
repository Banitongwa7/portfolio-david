import React from "react";
import { HiRocketLaunch } from "react-icons/hi2";

export default function Annoucement() {
  return (
    <div className="bg-[#0f172a]">
      <div
        id="annoucement"
        className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-center"
      >
        <p className="me-2 font-mono inline-block text-white">
          My personal portfolio is
        </p>
        <div className="words">
          <span className="word"></span>
          <span className="word">launched</span>
          <span className="word">online</span>
          <span className="word">ready</span>
        </div>
      </div>
    </div>
  );
}
