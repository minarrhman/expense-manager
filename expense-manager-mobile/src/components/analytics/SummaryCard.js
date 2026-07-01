import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function SummaryCard({
    title,
    amount,
    color,
    backgroundColor,
    fullWidth = false,
}) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: backgroundColor || colors.card,
                    borderColor: colors.border,
                },
                fullWidth && styles.fullWidth,
            ]}
        >
            <View
                style={[
                    styles.accent,
                    { backgroundColor: color },
                ]}
            />

            <Text
                style={[
                    styles.title,
                    { color: colors.secondaryText },
                ]}
            >
                {title}
            </Text>

            <Text
                style={[
                    styles.amount,
                    { color: color || colors.text },
                ]}
            >
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
        borderWidth: 1,
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
    },

    amount: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: "700",
    },
});