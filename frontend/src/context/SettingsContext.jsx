import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const [currency, setCurrency] = useState(
        localStorage.getItem("currency") || "BDT"
    );

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (theme === "light") {
            document.documentElement.classList.remove("dark");
        } else {
            // System
            if (
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    return (
        <SettingsContext.Provider
            value={{
                theme,
                setTheme,
                currency,
                setCurrency,
                language,
                setLanguage,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}