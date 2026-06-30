import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AIInsightCard = ({ type, title, message }) => {

    const getColor = () => {
        switch (type) {
            case "success":
                return "#2ecc71";
            case "warning":
                return "#f39c12";
            case "danger":
                return "#e74c3c";
            default:
                return "#3498db";
        }
    };

    const color = getColor();

    return (
        <View style={[styles.card, { borderLeftColor: color }]}>

            <Text style={styles.header}>
                🤖 AI Insight
            </Text>

            <Text style={[styles.title, { color }]}>
                {title}
            </Text>

            <Text style={styles.message}>
                {message}
            </Text>

        </View>
    );
};

export default AIInsightCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 14,
        marginBottom: 15,
        borderLeftWidth: 5,

        elevation: 3,
    },

    header: {
        fontSize: 13,
        color: "#777",
        marginBottom: 8,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },

    message: {
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
});