import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const AIInsightCard = ({ type, title, message }) => {
    const { colors } = useTheme();

    const getColor = () => {
        switch (type) {
            case "success":
                return "#2ECC71";
            case "warning":
                return "#F39C12";
            case "danger":
                return "#E74C3C";
            default:
                return "#3498DB";
        }
    };

    const color = getColor();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderLeftColor: color,
                },
            ]}
        >
            <Text
                style={[
                    styles.header,
                    { color: colors.secondaryText },
                ]}
            >
                🤖 AI Insight
            </Text>

            <Text
                style={[
                    styles.title,
                    { color },
                ]}
            >
                {title}
            </Text>

            <Text
                style={[
                    styles.message,
                    { color: colors.text },
                ]}
            >
                {message}
            </Text>
        </View>
    );
};

export default AIInsightCard;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 14,
        marginBottom: 15,
        borderLeftWidth: 5,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 3,
    },

    header: {
        fontSize: 13,
        marginBottom: 8,
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },

    message: {
        fontSize: 14,
        lineHeight: 20,
    },
});