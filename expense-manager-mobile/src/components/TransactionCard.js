import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { useTheme } from "../theme/ThemeProvider";

const TransactionCard = ({ type, amount, category }) => {
    const { colors } = useTheme();

    const isIncome = type === "income";

    return (
        <View
            style={[
                styles.row,
                {
                    borderBottomColor: colors.border,
                },
            ]}
        >
            <Text
                style={[
                    styles.category,
                    {
                        color: colors.text,
                    },
                ]}
            >
                {category}
            </Text>

            <Text
                style={[
                    styles.amount,
                    {
                        color: isIncome ? "#22C55E" : "#EF4444",
                    },
                ]}
            >
                {isIncome ? "+" : "-"}৳
                {Number(amount).toLocaleString()}
            </Text>
        </View>
    );
};

export default TransactionCard;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
    },

    category: {
        fontSize: 14,
    },

    amount: {
        fontSize: 14,
        fontWeight: "700",
    },
});