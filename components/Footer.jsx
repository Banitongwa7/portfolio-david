import React from "react";

export default function Footer() {
  return (
    <footer className="bg-sky-950 text-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-white"
            >
              Home
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-white"
            >
              Project
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-white"
            >
              Skills
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-white"
            >
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-white"
            >
              Contact
            </a>
          </div>
        </nav>
        <div className="flex justify-center mt-8 md:space-x-9 space-x-6">
          <a href="#" className="text-gray-400 hover:text-[#43d3e9]">
            <span className="sr-only">GitHub</span>
            <i className="bi bi-github text-[20px]"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#43d3e9]">
            <span className="sr-only">Twitter</span>
            <i className="bi bi-twitter text-[20px]"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#43d3e9]">
            <span className="sr-only">Linkedin</span>
            <i className="bi bi-linkedin text-[20px]"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#43d3e9]">
            <span className="sr-only">Behance</span>
            <i className="bi bi-behance text-[20px]"></i>
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © {new Date().getFullYear()} , Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
