"use client";

import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import AllLinks from "@/data/AllLinks";
import Switcher from "../switcher/Switcher";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const sidebarBtn = useRef<SVGSVGElement>(null);
  const pathname = usePathname();

  const openSideBar = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    sidebar.current?.classList.toggle("-translate-x-full");
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !sidebar.current?.contains(e.target as Node) &&
        !sidebarBtn.current?.contains(e.target as Node)
      ) {
        sidebar.current?.classList.add("-translate-x-full");
      }
    });
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-[#0f172a] bg-opacity-80 filter backdrop-blur-sm dark:bg-opacity-80 sticky top-0 z-40">
        <div className="header top-0 flex items-center justify-between px-8 md:py-2 py-4">
          <h1 className="w-3/12">
            <Link
              href="/"
              className="text-2xl font-bold hover:text-green-500 duration-200 dark:text-gray-100"
            >
              David.
            </Link>
          </h1>
          <button className="md:hidden dark:text-gray-100">
            <svg
              onClick={openSideBar}
              ref={sidebarBtn}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <nav className="hidden md:block font-semibold text-lg">
            <ul
              id="navbar-custom"
              className="flex items-center dark:text-gray-100"
            >
              <li
                className={`p-4 hover:text-green-500 cursor-pointer ${
                  pathname === "/" ? "active" : ""
                }`}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                className={`p-4 hover:text-green-500 cursor-pointer ${
                  pathname === "/about" ? "active" : ""
                }`}
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className={`p-4 hover:text-green-500 cursor-pointer ${
                  pathname === "/projects" ? "active" : ""
                }`}
              >
                <Link href="/projects">Projects</Link>
              </li>
              <li
                className={`p-4 hover:text-green-500 cursor-pointer ${
                  pathname === "/blog" ||
                  pathname === "/blog/[blogSlug]"
                    ? "active"
                    : ""
                }`}
              >
                <Link href="/blog">Blog</Link>
              </li>
              <li
                className={`p-4 hover:text-green-500 cursor-pointer ${
                  pathname === "/tools" || pathname === "/tools/[tool]" ? "active" : ""
                }`}
              >
                <Link href="/tools">Tools</Link>
              </li>
              <li
                className={`p-4 hover:text-green-500 cursor-pointer ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="w-3/12 justify-end hidden md:flex md:items-center dark:text-gray-100">
            <Link
              href={AllLinks.linkedin}
              className="p-4 text-[20px] hover:text-green-500 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </Link>

            <Link
              href={AllLinks.github}
              className="p-4 text-[20px] hover:text-green-500 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </Link>

            <Link
              href={AllLinks.twitter}
              className="p-4 text-[20px] hover:text-green-500 duration-200 mr-5"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareXTwitter />
            </Link>

            <Switcher />
          </div>
        </div>

        <div
          id="sidebar-custom"
          className="absolute z-[999] bg-gray-800 text-white w-64 h-screen overflow-y-auto transition-transform transform -translate-x-full ease-in-out duration-500"
          ref={sidebar}
        >
          <div className="p-4">
            <ul className="mt-4">
              <li
                className={`mb-2 p-3 rounded-md ${
                  pathname === "/" ? "active" : ""
                }`}
              >
                <Link href="/" className="block">
                  Home
                </Link>
              </li>
              <li
                className={`mb-2 p-3 rounded-md ${
                  pathname === "/about" ? "active" : ""
                }`}
              >
                <Link href="/about" className="block">
                  About
                </Link>
              </li>
              <li
                className={`mb-2 p-3 rounded-md ${
                  pathname === "/projects" ? "active" : ""
                }`}
              >
                <Link href="/projects" className="block">
                  Projects
                </Link>
              </li>
              <li
                className={`mb-2 p-3 rounded-md ${
                  pathname === "/blog" ||
                  pathname === "/blog/[blogSlug]"
                    ? "active"
                    : ""
                }`}
              >
                <Link href="/blog" className="block">
                  Blog
                </Link>
              </li>
              <li
                className={`mb-2 p-3 rounded-md ${
                  pathname === "/tools" || pathname === "/tools/[tool]"
                    ? "active"
                    : ""
                }`}
              >
                <Link href="/tools" className="block">
                  Tools
                </Link>
              </li>
              <li
                className={`mb-2 p-3 rounded-md ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link href="/contact" className="block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4 flex justify-center items-center w-[80%] mx-auto flex-wrap">
            <Link
              href={AllLinks.linkedin}
              className="p-4 text-[20px] hover:text-green-500 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </Link>

            <Link
              href={AllLinks.github}
              className="p-4 text-[20px] hover:text-green-500 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </Link>

            <Link
              href={AllLinks.twitter}
              className="p-4 text-[20px] hover:text-green-500 duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareXTwitter />
            </Link>

            <Switcher/>
          </div>
        </div>
      </header>
    </>
  );
}
