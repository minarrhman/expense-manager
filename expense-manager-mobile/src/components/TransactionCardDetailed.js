import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { useTheme } from "../theme/ThemeProvider";

export default function TransactionCardDetailed({
    transaction,
    onPress,
}) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                },
            ]}
            onPress={() => onPress(transaction)}
        >
            <View>
                <Text
                    style={[
                        styles.category,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    {transaction.category_name}
                </Text>

                <Text
                    style={[
                        styles.description,
                        {
                            color: colors.secondaryText,
                        },
                    ]}
                >
                    {transaction.description}
                </Text>

                <Text
                    style={[
                        styles.date,
                        {
                            color: colors.textMuted,
                        },
                    ]}
                >
                    {transaction.date}
                </Text>
            </View>

            <Text
                style={[
                    styles.amount,
                    {
                        color:
                            transaction.type === "income"
                                ? "#22C55E"
                                : "#EF4444",
                    },
                ]}
            >
                {transaction.type === "income" ? "+" : "-"}৳
                {Number(transaction.amount).toLocaleString()}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    category: {
        fontSize: 16,
        fontWeight: "600",
    },

    description: {
        marginTop: 4,
    },

    date: {
        marginTop: 8,
        fontSize: 12,
    },

    amount: {
        fontSize: 17,
        fontWeight: "bold",
        alignSelf: "center",
    },
});