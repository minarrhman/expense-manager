import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TransactionCard = ({ type, amount, category }) => {

    const isIncome = type === "income";

    return (
        <View style={styles.row}>

            <Text style={styles.category}>
                {category}
            </Text>

            <Text style={[
                styles.amount,
                { color: isIncome ? "#2ecc71" : "#e74c3c" }
            ]}>
                {isIncome ? "+" : "-"}৳{amount}
            </Text>

        </View>
    );
};

export default TransactionCard;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#eee",
    },

    category: {
        fontSize: 14,
        color: "#5a5a5a",
    },

    amount: {
        fontSize: 14,
        fontWeight: "bold",
    },
});