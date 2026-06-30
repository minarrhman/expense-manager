import React, {useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import FloatingAddButton from "../components/FloatingAddButton"
import DashboardScreen from "../screens/DashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => (
    <Ionicons
        name={name}
        size={22}
        color={focused ? "#4f46e5" : "#999"}
    />
);

export default function TabNavigator() {
    const [routeName, setRouteName] = useState("Home")
    const navigation = useNavigation();
    return (
        <View style={{flex:1}}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: 60,
                        paddingBottom: 8,
                        paddingTop: 8,
                        backgroundColor: "#fff",
                        borderTopWidth: 0,
                        elevation: 5,
                    },
                }}
                screenListeners={{
                    state: (e) => {
                        const index = e.data.state.index;
                        const currentRoute = e.data.state.routeNames[index];
                        setRouteName(currentRoute);
                    },
                }}
            >

                {/* Home / Dashboard */}
                <Tab.Screen
                    name="Home"
                    component={DashboardScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? "home" : "home-outline"} focused={focused} />
                    ),
                }}
                />

                {/* Analytics */}
                <Tab.Screen
                    name="Analytics"
                    component={AnalyticsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? "bar-chart" : "bar-chart-outline"} focused={focused} />
                    ),
                }}
                />

                {/* Transactions */}
                <Tab.Screen
                    name="Transactions"
                    component={TransactionsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? "list" : "list-outline"} focused={focused} />
                    ),
                }}
                />

                {/* Profile */}
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? "person" : "person-outline"} focused={focused} />
                    ),
                }}
                />

            </Tab.Navigator>
            {(routeName === "Home" || routeName === "Transactions") && (
                <FloatingAddButton
                    onPress={() => navigation.navigate("TransactionForm")}
                />
            )}
        </View>
    );
}