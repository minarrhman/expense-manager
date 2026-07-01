import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const BalanceCard = ({ balance, income, expense }) => {
    const { colors, isDark } = useTheme();

    const savings = income - expense;
    const savingsRate = income ? (savings / income) * 100 : 0;

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: isDark
                        ? colors.card
                        : "#1E2A78",
                    borderWidth: isDark ? 1 : 0,
                    borderColor: colors.border,
                },
            ]}
        >
            <Text
                style={[
                    styles.label,
                    {
                        color: isDark
                            ? colors.secondaryText
                            : "#B8C0FF",
                    },
                ]}
            >
                💰 Total Balance
            </Text>

            <Text
                style={[
                    styles.balance,
                    {
                        color: isDark
                            ? colors.text
                            : "#FFF",
                    },
                ]}
            >
                ৳ {Number(balance || 0).toLocaleString()}
            </Text>

            <Text
                style={[
                    styles.insight,
                    {
                        color:
                            savings >= 0
                                ? "#22C55E"
                                : "#EF4444",
                    },
                ]}
            >
                {savings >= 0
                    ? `↑ Saved ${Math.round(savingsRate)}% this month`
                    : `↓ Overspent ${Math.abs(Math.round(savingsRate))}% this month`}
            </Text>
        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 18,
        marginBottom: 15,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },

    label: {
        fontSize: 14,
    },

    balance: {
        fontSize: 34,
        fontWeight: "bold",
        marginVertical: 10,
    },

    insight: {
        fontSize: 14,
        fontWeight: "600",
    },
});