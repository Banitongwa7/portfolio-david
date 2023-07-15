import React, { useRef } from "react";

export default function Navbar() {
    const toggle = useRef()

    const handleToggle = () => {
        toggle.current.classList.toggle("hidden")
    }

    const handleMenu = (e) => {
        var links = document.querySelectorAll("#navbar-default a")
        for (var i = 0; i < links.length; i++){
            links[i].classList.remove("active")
        }
        e.target.classList.add("active")
    }

  return (
    <nav className="w-full px-[10%] bg-gray-900 fixed z-40">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            David.
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div ref={toggle} onClick={handleMenu} className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
          <li><a href="#" className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-[#43d3e9] hover:bg-gray-700 hover:text-white md:hover:bg-transparent active">Home</a></li>
          <li><a href="#" className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-[#43d3e9] hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Project</a></li>
          <li><a href="#" className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-[#43d3e9] hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Skills</a></li>
          <li><a href="#" className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-[#43d3e9] hover:bg-gray-700 hover:text-white md:hover:bg-transparent">About</a></li>
          <li><a href="#" className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-white md:hover:text-[#43d3e9] hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
