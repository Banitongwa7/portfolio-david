import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import AllLinks from "@/data/AllLinks";

export default function NavBar() {
  const navbar = useRef(null);
  const sidebar = useRef(null);
  const sidebarBtn = useRef(null);

  const handleChangeMenu = (index) => {
    let liTags = navbar.current.children;
    Array.from(liTags).forEach((li) => {
      li.classList.remove("active");
    });
    liTags[index].classList.add("active");
  };

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
            className="text-2xl font-bold hover:text-green-500 duration-200"
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
          <ul ref={navbar} id="navbar-custom" className="flex items-center">
            <li className="p-4 active hover:text-green-500 cursor-pointer active">
              <Link href="/" onClick={() => handleChangeMenu(0)}>
                Home
              </Link>
            </li>
            <li className="p-4 hover:text-green-500 cursor-pointer">
              <Link href="/about" onClick={() => handleChangeMenu(1)}>
                About
              </Link>
            </li>
            <li className="p-4 hover:text-green-500 cursor-pointer">
              <Link href="/projects" onClick={() => handleChangeMenu(2)}>
                Projects
              </Link>
            </li>
            <li className="p-4 hover:text-green-500 cursor-pointer">
              <Link href="/blog" onClick={() => handleChangeMenu(3)}>
                Blog
              </Link>
            </li>
            <li className="p-4 hover:text-green-500 cursor-pointer">
              <Link href="/contact" onClick={() => handleChangeMenu(4)}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-3/12 justify-end hidden md:flex">
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
        className="absolute z-[999] bg-gray-800 text-white w-64 h-full overflow-y-auto transition-transform transform -translate-x-full ease-in-out duration-500"
        ref={sidebar}
      >
        <div className="p-4">
          <ul className="mt-4">
            <li className="mb-2 hover:bg-green-500 p-3 rounded-md duration-200">
              <Link href="/" className="block">
                Home
              </Link>
            </li>
            <li className="mb-2 hover:bg-green-500 p-3 rounded-md duration-200">
              <Link href="/about" className="block">
                About
              </Link>
            </li>
            <li className="mb-2 hover:bg-green-500 p-3 rounded-md duration-200">
              <Link href="/projects" className="block">
                Projects
              </Link>
            </li>
            <li className="mb-2 hover:bg-green-500 p-3 rounded-md duration-200">
              <Link href="/blog" className="block">
                Blog
              </Link>
            </li>
            <li className="mb-2 hover:bg-green-500 p-3 rounded-md duration-200">
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
