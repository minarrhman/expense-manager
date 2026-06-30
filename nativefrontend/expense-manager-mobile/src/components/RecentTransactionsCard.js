import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TransactionCard from "./TransactionCard";

const RecentTransactionsCard = ({ transactions }) => {
    return (
        <View style={styles.card}>

            <Text style={styles.header}>
                🧾 Recent Transactions
            </Text>

            {transactions.map((item, index) => (
                <TransactionCard
                    key={index}
                    type={item.type}
                    amount={item.amount}
                    category={item.category_name}
                />
            ))}

            <Text style={styles.seeAll}>
                See All →
            </Text>

        </View>
    );
};

export default RecentTransactionsCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 14,
        marginBottom: 20,
        elevation: 3,
    },

    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },

    seeAll: {
        marginTop: 10,
        color: "#3498db",
        fontWeight: "600",
        textAlign: "left",
    },
});