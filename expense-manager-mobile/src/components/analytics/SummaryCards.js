import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

import SummaryCard from "./SummaryCard";

export default function SummaryCards({ summary }) {
    const { colors } = useTheme();

    if (!summary) return null;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <SummaryCard
                    title="Income"
                    amount={summary.income}
                    color={colors.success}
                    backgroundColor={colors.cardBackground}
                />

                <SummaryCard
                    title="Expense"
                    amount={summary.expense}
                    color={colors.danger}
                    backgroundColor={colors.cardBackground}
                />
            </View>

            <SummaryCard
                title="Balance"
                amount={summary.balance}
                color={colors.primary}
                backgroundColor={colors.cardBackground}
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