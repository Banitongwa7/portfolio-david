import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import AnimatedCursor from "react-animated-cursor";

export default function Switcher({ setDarkToggle }) {
  /*const [theme, setTheme] = useDarkSide();*/
  const [darkSide, setDarkSide] = useState(null);

  const toggleDarkMode = (checked) => {
    window.localStorage.setItem("darkMode", !checked);
    setDarkSide(checked);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (window.localStorage.getItem("darkMode") == "false") {
      root.classList.add("dark");
      setDarkSide(true);
    } else {
      root.classList.remove("dark");
      setDarkSide(false);
    }
  }, [darkSide]);

  useEffect(() => {
    setDarkToggle(darkSide);
  })


  return (
    <div className="p-2 bg-gray-200 dark:bg-gray-800 filter backdrop-blur rounded-lg border border-gray-300 dark:border-green-800" title="Toggle Dark Mode">
     <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
     </div>
  );
}
