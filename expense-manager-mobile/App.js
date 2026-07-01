import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import { ToastProvider } from "./src/components/common/ToastProvider";
import { ThemeProvider } from "./src/theme/ThemeProvider";

export default function App() {
    return (
        <NavigationContainer>
            <ThemeProvider>
                <ToastProvider>
                    <AppNavigator />
                </ToastProvider>
            </ThemeProvider>
        </NavigationContainer>
    );
}