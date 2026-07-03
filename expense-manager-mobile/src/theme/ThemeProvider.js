import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    lightColors,
    darkColors,
} from "./colors";

const ThemeContext = createContext();

const THEME_KEY = "theme_mode";

export function ThemeProvider({ children }) {

    const [isDark, setIsDark] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load saved theme on app start
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_KEY);

                if (savedTheme !== null) {
                    setIsDark(JSON.parse(savedTheme));
                }
            } catch (error) {
                console.log("Failed to load theme:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTheme();
    }, []);

    const toggleTheme = async () => {
        try {
            const newValue = !isDark;
            setIsDark(newValue);
            await AsyncStorage.setItem(
                THEME_KEY,
                JSON.stringify(newValue)
            );
        } catch (error) {
            console.log("Failed to save theme:", error);
        }
    };

    const colors = isDark ? darkColors : lightColors;

    // Prevent rendering until the saved theme has been loaded
    if (isLoading) {
        return null;
    }

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