"use client";

import { useEffect, useState } from "react";
//import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
  const [darkSide, setDarkSide] = useState<boolean>(false);

  const toggleDarkMode = (checked: boolean) => {
    window.localStorage.setItem("darkMode", (!checked).toString());
    setDarkSide(checked);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (
      window.localStorage.getItem("darkMode") == "false" ||
      window.localStorage.getItem("darkMode") == null
    ) {
      root.classList.add("dark");
      setDarkSide(true);
    } else {
      root.classList.remove("dark");
      setDarkSide(false);
    }
  }, [darkSide]);

  return (
    <div
      className="p-2 bg-gray-200 dark:bg-gray-800 filter backdrop-blur rounded-lg border border-gray-300 dark:border-green-800"
      title="Toggle Dark Mode"
    >
      <button
        type="button"
        aria-label="Toggle Dark Mode"
        onClick={() => toggleDarkMode(!darkSide)}
        className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <svg
          className="fill-violet-700 block dark:hidden"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg
          className="fill-yellow-500 hidden dark:block"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
}
