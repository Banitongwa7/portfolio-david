import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import AllLinks from "@/data/AllLinks";
import { useRouter } from "next/router";
import Switcher from "../switcher/Switcher";

export default function NavBar() {
  const sidebar = useRef(null);
  const sidebarBtn = useRef(null);
  const router = useRouter();

  const openSideBar = (e) => {
    e.stopPropagation();
    sidebar.current.classList.toggle("-translate-x-full");
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !sidebar.current.contains(e.target) &&
        !sidebarBtn.current.contains(e.target)
      ) {
        sidebar.current.classList.add("-translate-x-full");
      }
    });
  }, []);

  return (
    <header>
      <div className="header top-0 flex items-center justify-between px-8 md:py-2 py-4">
        <h1 className="w-3/12">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-green-500 duration-200 dark:text-white"
          >
            David.
          </Link>
        </h1>
        <button className="md:hidden">
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
          <ul id="navbar-custom" className="flex items-center dark:text-white">
            <li className={`p-4 hover:text-green-500 cursor-pointer ${router.pathname === "/" ? "active" : ""}`}>
              <Link href="/">
                Home
              </Link>
            </li>
            <li className={`p-4 hover:text-green-500 cursor-pointer ${router.pathname === "/about" ? "active" : ""}`}>
              <Link href="/about">
                About
              </Link>
            </li>
            <li className={`p-4 hover:text-green-500 cursor-pointer ${router.pathname === "/projects" ? "active" : ""}`}>
              <Link href="/projects">
                Projects
              </Link>
            </li>
            <li className={`p-4 hover:text-green-500 cursor-pointer ${router.pathname === "/blog" || router.pathname === "/blog/[slug]" ? "active" : ""}`}>
              <Link href="/blog">
                Blog
              </Link>
            </li>
            <li className={`p-4 hover:text-green-500 cursor-pointer ${router.pathname === "/contact" ? "active" : ""}`}>
              <Link href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-3/12 justify-end hidden md:flex dark:text-white">
          <div>
          <Switcher />
          </div>
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
        </div>
      </div>


      <div
      id="sidebar-custom"
        className="absolute z-[999] bg-gray-800 text-white w-64 h-full overflow-y-auto transition-transform transform -translate-x-full ease-in-out duration-500"
        ref={sidebar}
      >
        <div className="p-4">
          <ul className="mt-4">
            <li className={`mb-2 p-3 rounded-md ${router.pathname === "/" ? "active" : ""}`}>
              <Link href="/" className="block">
                Home
              </Link>
            </li>
            <li className={`mb-2 p-3 rounded-md ${router.pathname === "/about" ? "active" : ""}`}>
              <Link href="/about" className="block">
                About
              </Link>
            </li>
            <li className={`mb-2 p-3 rounded-md ${router.pathname === "/projects" ? "active" : ""}`}>
              <Link href="/projects" className="block">
                Projects
              </Link>
            </li>
            <li className={`mb-2 p-3 rounded-md ${router.pathname === "/blog" || router.pathname === "/blog/[slug]" ? "active" : ""}`}>
              <Link href="/blog" className="block">
                Blog
              </Link>
            </li>
            <li className={`mb-2 p-3 rounded-md ${router.pathname === "/contact" ? "active" : ""}`}>
              <Link href="/contact" className="block">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 flex justify-center items-center">
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
        </div>
      </div>
    </header>
  );
}
