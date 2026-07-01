import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BudgetWarningCard = ({ warnings }) => {

    const getStatus = (item) => {
        if (item.spent > item.limit) return "danger";
        if (item.spent > item.limit * 0.8) return "warning";
        return "safe";
    };

    const getColor = (status) => {
        switch (status) {
            case "danger":
                return "#e74c3c";
            case "warning":
                return "#f39c12";
            default:
                return "#2ecc71";
        }
    };

    if (!warnings || warnings.length === 0) {
        return (
            <View style={styles.card}>
                <Text style={styles.safeText}>
                    ✅ All categories are within limit
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>

            <Text style={styles.header}>
                ⚠ Budget Alerts
            </Text>

            {warnings.map((item, index) => {
                const status = getStatus(item);
                const color = getColor(status);

                return (
                    <View key={index} style={styles.row}>
                        <Text style={[styles.text, { color }]}>
                            {status === "danger"
                                ? `🔴 ${item.category} exceeded by ৳${item.exceeded_by}`
                                : `🟡 ${item.category} near limit`}
                        </Text>
                    </View>
                );
            })}

        </View>
    );
};

export default BudgetWarningCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 14,
        marginBottom: 15,
        elevation: 3,
    },

    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },

    row: {
        marginBottom: 8,
    },

    text: {
        fontSize: 14,
    },

    safeText: {
        color: "#2ecc71",
        fontSize: 14,
        fontWeight: "bold",
    },
});