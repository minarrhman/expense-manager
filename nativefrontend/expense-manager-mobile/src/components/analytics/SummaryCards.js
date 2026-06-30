import React from "react";
import { View, StyleSheet } from "react-native";

import SummaryCard from "./SummaryCard";

export default function SummaryCards({ summary }) {
    if (!summary) return null;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <SummaryCard
                    title="Income"
                    amount={summary.income}
                    color="#16A34A"
                    backgroundColor="#F0FDF4"
                />

                <SummaryCard
                    title="Expense"
                    amount={summary.expense}
                    color="#DC2626"
                    backgroundColor="#FEF2F2"
                />
            </View>
            <SummaryCard
                title="Balance"
                amount={summary.balance}
                color="#2563EB"
                backgroundColor="#EFF6FF"
                fullWidth
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});