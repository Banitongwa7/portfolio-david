import { useState, useEffect } from "react";
export default function useDarkSide() {
    const [theme, setTheme] = useState( async () => {
        // Récupérer la valeur du thème depuis le localStorage lors de la première exécution
        const savedTheme = await localStorage.getItem('theme');
        return savedTheme == "dark" ? "dark" : "light";
      });
    const colorTheme = theme == "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme)
    }, [theme, colorTheme]);
 
    return [colorTheme, setTheme];
}
