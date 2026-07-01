import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function CategoryBar({
    category,
    amount,
    percentage,
    color,
}) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text
                    style={[
                        styles.category,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    {category}
                </Text>

                <Text
                    style={[
                        styles.amount,
                        {
                            color: colors.secondaryText,
                        },
                    ]}
                >
                    ৳ {Number(amount).toLocaleString()}
                </Text>
            </View>

            <View
                style={[
                    styles.track,
                    {
                        backgroundColor: colors.border,
                    },
                ]}
            >
                <View
                    style={[
                        styles.fill,
                        {
                            width: `${percentage}%`,
                            backgroundColor: color,
                        },
                    ]}
                />
            </View>

            <Text
                style={[
                    styles.percent,
                    {
                        color: colors.secondaryText,
                    },
                ]}
            >
                {percentage.toFixed(1)}%
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 18,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    category: {
        fontSize: 15,
        fontWeight: "600",
    },

    amount: {
        fontSize: 14,
    },

    track: {
        width: "100%",
        height: 10,
        borderRadius: 10,
        overflow: "hidden",
    },

    fill: {
        height: "100%",
        borderRadius: 10,
    },

    percent: {
        marginTop: 5,
        alignSelf: "flex-end",
        fontSize: 13,
    },
});