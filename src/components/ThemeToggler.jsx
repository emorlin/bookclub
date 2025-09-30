import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex ml-auto cursor-pointer items-center justify-center w-10 h-10 rounded-full 
                 bg-gray-200 dark:bg-gray-700 
                 text-gray-900 dark:text-yellow-300 
                 shadow hover:scale-110 transition"
            aria-label="Växla tema"
            tooltip="Växla tema">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
