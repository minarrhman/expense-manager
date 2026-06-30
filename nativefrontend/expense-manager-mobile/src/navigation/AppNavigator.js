import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TransactionFormScreen from "../screens/TransactionFormScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />

            {/* MAIN APP */}
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="TransactionForm" 
            component={TransactionFormScreen}
            options={{
                presentation: 'modal',
                headerShown:false,
            }}
            />

        </Stack.Navigator>
    );
}