import React, { useCallback, useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { getCategoryLimits } from "../api/categoryLimit";
import BudgetCard from "../components/BudgetCard";
import { useTheme } from "../theme/ThemeProvider";

const BudgetLimitScreen = ({ navigation }) => {

    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const { colors } = useTheme();

    const fetchBudgets = async () => {
        try {
            setLoading(true);

            const data = await getCategoryLimits();
            setBudgets(data.results);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchBudgets();
        }, [])
    );

    const ListHeader = () => (
        <View style={styles.header}>

            <Text
                style={[
                    styles.title,
                    {
                        color: colors.text,
                    },
                ]}
            >
                Budget Limits
            </Text>

            <Text
                style={[
                    styles.subtitle,
                    {
                        color: colors.secondaryText,
                    },
                ]}
            >
                Track your monthly spending by category.
            </Text>

            <TouchableOpacity
                style={[
                    styles.addButton,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
                onPress={() =>
                    navigation.navigate("AddEditBudgetLimit")
                }
            >
                <Ionicons
                    name="add-circle-outline"
                    size={20}
                    color="#fff"
                />

                <Text style={styles.addButtonText}>
                    Set Category Limit
                </Text>

            </TouchableOpacity>

        </View>
    );

    if (loading) {
        return (
            <View
                style={[
                    styles.center,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (budgets.length === 0) {
        return (
            <View
                style={[
                    styles.center,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >

                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    Budget Limits
                </Text>

                <Text
                    style={[
                        styles.emptyText,
                        {
                            color: colors.secondaryText,
                        },
                    ]}
                >
                    You haven't created any budget limits yet.
                </Text>

                <TouchableOpacity
                    style={[
                        styles.addButton,
                        {
                            backgroundColor: colors.primary,
                        },
                    ]}
                    onPress={() =>
                        navigation.navigate("AddEditBudgetLimit")
                    }
                >
                    <Text style={styles.addButtonText}>
                        + Set Category Limit
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }

    return (
        <FlatList
            style={{
                backgroundColor: colors.background,
            }}
            ListHeaderComponent={ListHeader}
            data={budgets}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
                <BudgetCard
                    budget={item}
                    navigation={navigation}
                />
            )}
        />
    );
};

export default BudgetLimitScreen;

const styles = StyleSheet.create({

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        fontSize: 16,
    },

    list: {
        padding: 15,
    },

    header: {
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
    },

    subtitle: {
        fontSize: 15,
        marginBottom: 18,
        lineHeight: 22,
    },

    addButton: {
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    addButtonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 8,
    },

});