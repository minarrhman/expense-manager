import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SummaryCard({
    title,
    amount,
    color,
    backgroundColor,
    fullWidth = false,
}) {
    return (
        <View
            style={[
                styles.card,
                { backgroundColor },
                fullWidth && styles.fullWidth,
            ]}
        >
            <View
                style={[
                    styles.accent,
                    { backgroundColor: color },
                ]}
            />

            <Text style={styles.title}>{title}</Text>

            <Text style={[styles.amount, { color }]}>
                ৳ {Number(amount || 0).toLocaleString()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 18,
        width: "48%",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },

    accent: {
        height: 5,
        width: 45,
        borderRadius: 10,
        marginBottom: 14,
    },

    fullWidth: {
        width: "100%",
        marginTop: 16,
    },

    title: {
        fontSize: 14,
        color: "#555",
    },

    amount: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "700",
    },
});