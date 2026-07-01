import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { useTheme } from "../theme/ThemeProvider";

const SummaryCards = ({ income, expense }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>

            {/* Income Card */}
            <View
                style={[
                    styles.card,
                    styles.incomeCard,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.label,
                        { color: colors.secondaryText },
                    ]}
                >
                    💵 Income
                </Text>

                <Text
                    style={[
                        styles.amount,
                        { color: "#16A34A" },
                    ]}
                >
                    ৳ {Number(income || 0).toLocaleString()}
                </Text>
            </View>

            {/* Expense Card */}
            <View
                style={[
                    styles.card,
                    styles.expenseCard,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.label,
                        { color: colors.secondaryText },
                    ]}
                >
                    🔻 Expense
                </Text>

                <Text
                    style={[
                        styles.amount,
                        { color: "#DC2626" },
                    ]}
                >
                    ৳ {Number(expense || 0).toLocaleString()}
                </Text>
            </View>

        </View>
    );
};

export default SummaryCards;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    card: {
        flex: 1,
        padding: 15,
        borderRadius: 14,
        marginHorizontal: 5,
        borderWidth: 1,
        elevation: 3,
    },

    incomeCard: {
        borderLeftWidth: 4,
        borderLeftColor: "#16A34A",
    },

    expenseCard: {
        borderLeftWidth: 4,
        borderLeftColor: "#DC2626",
    },

    label: {
        fontSize: 13,
        marginBottom: 5,
    },

    amount: {
        fontSize: 18,
        fontWeight: "bold",
    },
});