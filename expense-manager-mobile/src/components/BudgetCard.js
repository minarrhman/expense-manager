import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import Icon, { getCategoryIcon } from "../utils/categoryIcons";
import BudgetProgressBar from "./BudgetProgressBar";
import StatusBadge from "./StatusBadge";
import { useTheme } from "../theme/ThemeProvider";

const BudgetCard = ({ budget, navigation }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                },
            ]}
            onPress={() =>
                navigation.navigate("AddEditBudgetLimit", {
                    budget,
                })
            }
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon
                        name={getCategoryIcon(budget.category_name)}
                        size={22}
                        color={colors.primary}
                    />

                    <Text
                        style={[
                            styles.title,
                            { color: colors.text },
                        ]}
                    >
                        {budget.category_name}
                    </Text>
                </View>

                <StatusBadge status={budget.status} />
            </View>

            {/* Amount */}
            <Text
                style={[
                    styles.amount,
                    { color: colors.text },
                ]}
            >
                ৳{Number(budget.spent).toLocaleString()} / ৳
                {Number(budget.limit).toLocaleString()}
            </Text>

            {/* Progress */}
            <BudgetProgressBar
                percentage={budget.percentage_used}
                status={budget.status}
            />

            {/* Bottom */}
            <View style={styles.bottomRow}>
                <Text
                    style={[
                        styles.remaining,
                        {
                            color:
                                budget.status === "exceeded"
                                    ? "#EF4444"
                                    : colors.secondaryText,
                        },
                    ]}
                >
                    {budget.status === "exceeded"
                        ? `Over Budget: ৳${Math.abs(
                              Number(budget.remaining)
                          ).toFixed(2)}`
                        : `Remaining: ৳${Number(
                              budget.remaining
                          ).toFixed(2)}`}
                </Text>

                <Text
                    style={[
                        styles.percent,
                        { color: colors.text },
                    ]}
                >
                    {budget.percentage_used}%
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default BudgetCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        borderWidth: 1,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
    },

    amount: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 18,
        marginBottom: 12,
    },

    bottomRow: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    remaining: {
        fontSize: 14,
        fontWeight: "600",
    },

    percent: {
        fontSize: 14,
        fontWeight: "700",
    },
});