// components/dashboard/BalanceCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BalanceCard = ({ balance, income, expense }) => {

    const savings = income - expense;
    const savingsRate = income ? (savings / income) * 100 : 0;

    return (
        <View style={styles.card}>

            <Text style={styles.label}>
                💰 Total Balance
            </Text>

            <Text style={styles.balance}>
                ৳ {balance}
            </Text>

            <Text style={styles.insight}>
                ↑ Saved {Math.round(savingsRate)}% this month
            </Text>

        </View>
    );
};

export default BalanceCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#1E2A78",
        padding: 20,
        borderRadius: 18,
        marginBottom: 15,
    },

    label: {
        color: "#B8C0FF",
        fontSize: 14,
    },

    balance: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 10,
    },

    insight: {
        color: "#A6FFCB",
        fontSize: 14,
    },
});