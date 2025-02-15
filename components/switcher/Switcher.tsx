"use client";

import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
  const [darkSide, setDarkSide] = useState<boolean>(false);

  const toggleDarkMode = (checked: boolean) => {
    window.localStorage.setItem("darkMode", (!checked).toString());
    setDarkSide(checked);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (window.localStorage.getItem("darkMode") == "false" || window.localStorage.getItem("darkMode") == null) {
      root.classList.add("dark");
      setDarkSide(true);
    } else {
      root.classList.remove("dark");
      setDarkSide(false);
    }
  }, [darkSide]);

  return (
    <div className="p-2 bg-gray-200 dark:bg-gray-800 filter backdrop-blur rounded-lg border border-gray-300 dark:border-green-800" title="Toggle Dark Mode">
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
     </div>
  );
}
