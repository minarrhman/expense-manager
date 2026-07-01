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

const BudgetCard = ({ budget, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
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
                        color="#4F46E5"
                    />

                    <Text style={styles.title}>
                        {budget.category_name}
                    </Text>
                </View>

                <StatusBadge status={budget.status} />
            </View>

            {/* Amount */}
            <Text style={styles.amount}>
                ৳{budget.spent} / ৳{budget.limit}
            </Text>

            {/* Progress */}
            <BudgetProgressBar
                percentage={budget.percentage_used}
                status={budget.status}
            />

            {/* Bottom */}
            <View style={styles.bottomRow}>
                <Text style={styles.remaining}>
                    {budget.status === "exceeded"
                        ? `Over Budget: ৳${Math.abs(
                              Number(budget.remaining)
                          ).toFixed(2)}`
                        : `Remaining: ৳${Number(
                              budget.remaining
                          ).toFixed(2)}`}
                </Text>

                <Text style={styles.percent}>
                    {budget.percentage_used}%
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default BudgetCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
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
        color: "#111827",
    },

    bottomRow: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    remaining: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "600",
    },

    percent: {
        fontSize: 14,
        fontWeight: "700",
        color: "#374151",
    },
});