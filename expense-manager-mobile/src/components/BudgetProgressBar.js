import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BudgetProgressBar = ({ percentage, status }) => {
    const progress = Math.min(percentage, 100);

    const getColor = () => {
        switch (status) {
            case "safe":
                return "#22C55E"; // Green
            case "warning":
                return "#F59E0B"; // Orange
            case "exceeded":
                return "#EF4444"; // Red
            default:
                return "#3B82F6";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.track}>
                <View
                    style={[
                        styles.progress,
                        {
                            width: `${progress}%`,
                            backgroundColor: getColor(),
                        },
                    ]}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.percent}>
                    {percentage.toFixed(0)}% Used
                </Text>

                <View
                    style={[
                        styles.badge,
                        { backgroundColor: getColor() },
                    ]}
                >
                    <Text style={styles.badgeText}>
                        {status.toUpperCase()}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default BudgetProgressBar;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },

    track: {
        height: 10,
        backgroundColor: "#E5E7EB",
        borderRadius: 8,
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        borderRadius: 8,
    },

    footer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    percent: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "bold",
    },
});