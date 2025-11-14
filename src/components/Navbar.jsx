import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="flex justify-end mb-4">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-700"
            >
                {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
            </button>
        </nav>
    );
}