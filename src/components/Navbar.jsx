import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Import icons

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="p-4 flex justify-end">
            <button 
                onClick={toggleTheme}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-md active:scale-[0.98]"
                aria-label="Toggle Theme"
            >
                {/* Hiển thị icon tương ứng với theme hiện tại */}
                {theme === "light" ? <Moon size={20}/> : <Sun size={20}/>}
            </button>
        </nav>
    );
}