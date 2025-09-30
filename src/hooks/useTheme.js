import { useEffect, useState } from "react";

export function useTheme() {
    // Läs från localStorage eller system – men kolla också på <html>
    const [preference, setPreference] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;

        // om inget sparat: kolla om .dark redan ligger på html
        if (document.documentElement.classList.contains("dark")) {
            return "system"; // låt system styra
        }

        return "system";
    });

    const getSystemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const theme = preference === "system" ? getSystemTheme() : preference;

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        if (preference === "system") {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", preference);
        }
    }, [theme, preference]);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            if (preference === "system") {
                setPreference("system");
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [preference]);

    const setLight = () => setPreference("light");
    const setDark = () => setPreference("dark");
    const setSystem = () => setPreference("system");
    const toggleTheme = () => setPreference(theme === "dark" ? "light" : "dark");

    return { theme, preference, setLight, setDark, setSystem, toggleTheme };
}
