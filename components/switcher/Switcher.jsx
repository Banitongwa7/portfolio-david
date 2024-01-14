import {useState} from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkSide from '../hooks/useDarkSide'

export default function Switcher() {
    const [theme, setTheme] = useDarkSide()
    const [darkSide, setDarkSide] = useState(theme === "light" ? true : false)

    const toggleDarkMode = (checked) => {
        setTheme(theme)
        setDarkSide(checked)
    }

  return (
    <>
        <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={30}/>
    </>
  )
}
