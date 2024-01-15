import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/useDarkSide";
import AnimatedCursor from "react-animated-cursor";

export default function Switcher() {
  const [theme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(theme === "light" ? true : false);

  const toggleDarkMode = (checked) => {
    setTheme(theme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={30} />
      <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: darkSide ? "#fff" : "#1D2B53",
          }}
          outerStyle={{
            border: darkSide ? "2px solid #fff" : "2px solid #1D2B53",
          }}
        />
    </>
  );
}
