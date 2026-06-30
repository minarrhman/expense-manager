import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SummaryCards = ({ income, expense }) => {
    return (
        <View style={styles.container}>

            {/* Income Card */}
            <View style={[styles.card, styles.incomeCard]}>
                <Text style={styles.label}>💵 Income</Text>
                <Text style={styles.amount}>৳ {income}</Text>
            </View>

            {/* Expense Card */}
            <View style={[styles.card, styles.expenseCard]}>
                <Text style={styles.label}>🔻 Expense</Text>
                <Text style={styles.amount}>৳ {expense}</Text>
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
        backgroundColor: "#fff",

        // soft fintech shadow
        elevation: 3,
    },

    incomeCard: {
        borderLeftWidth: 4,
        borderLeftColor: "#2ecc71",
    },

    expenseCard: {
        borderLeftWidth: 4,
        borderLeftColor: "#e74c3c",
    },

    label: {
        fontSize: 13,
        color: "#777",
        marginBottom: 5,
    },

    amount: {
        fontSize: 18,
        fontWeight: "bold",
    },
});