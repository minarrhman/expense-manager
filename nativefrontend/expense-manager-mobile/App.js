import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import { ToastProvider } from "./src/components/common/ToastProvider";

export default function App() {
    return (
        <NavigationContainer>
            <ToastProvider>
                <AppNavigator />
            </ToastProvider>
        </NavigationContainer>
    );
}