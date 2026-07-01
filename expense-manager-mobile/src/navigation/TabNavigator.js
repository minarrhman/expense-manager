import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeProvider";

import FloatingAddButton from "../components/FloatingAddButton";
import DashboardScreen from "../screens/DashboardScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BudgetLimitScreen from "../screens/BudgetLimitScreen";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
    const { colors } = useTheme();

    return (
        <Ionicons
            name={name}
            size={22}
            color={focused ? colors.primary : colors.secondaryText}
        />
    );
};

export default function TabNavigator() {
    const [routeName, setRouteName] = useState("Home");

    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,

                    tabBarStyle: {
                        height: 60,
                        paddingBottom: 8,
                        paddingTop: 8,
                        backgroundColor: colors.card,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                        elevation: 5,
                    },

                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.secondaryText,
                }}
                screenListeners={{
                    state: (e) => {
                        const index = e.data.state.index;
                        const currentRoute =
                            e.data.state.routeNames[index];

                        setRouteName(currentRoute);
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={DashboardScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                name={
                                    focused
                                        ? "home"
                                        : "home-outline"
                                }
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Analytics"
                    component={AnalyticsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                name={
                                    focused
                                        ? "bar-chart"
                                        : "bar-chart-outline"
                                }
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Transactions"
                    component={TransactionsScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                name={
                                    focused
                                        ? "list"
                                        : "list-outline"
                                }
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Budget"
                    component={BudgetLimitScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                name={
                                    focused
                                        ? "wallet"
                                        : "wallet-outline"
                                }
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon
                                name={
                                    focused
                                        ? "person"
                                        : "person-outline"
                                }
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>

            {(routeName === "Home" ||
                routeName === "Transactions") && (
                <FloatingAddButton
                    onPress={() =>
                        navigation.navigate("TransactionForm")
                    }
                />
            )}
        </View>
    );
}