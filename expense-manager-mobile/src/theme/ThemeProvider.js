import React, {
    createContext,
    useContext,
    useState,
} from "react";

import {
    lightColors,
    darkColors,
} from "./colors";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    const colors = isDark
        ? darkColors
        : lightColors;

    return (
        <ThemeContext.Provider
            value={{
                isDark,
                toggleTheme,
                colors,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);