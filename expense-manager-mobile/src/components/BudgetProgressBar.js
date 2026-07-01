import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const BudgetProgressBar = ({ percentage, status }) => {
    const { colors } = useTheme();

    const progress = Math.min(percentage, 100);

    const getColor = () => {
        switch (status) {
            case "safe":
                return "#22C55E";
            case "warning":
                return "#F59E0B";
            case "exceeded":
                return "#EF4444";
            default:
                return "#3B82F6";
        }
    };

    const statusColor = getColor();

    return (
        <View style={styles.container}>
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
                        styles.progress,
                        {
                            width: `${progress}%`,
                            backgroundColor: statusColor,
                        },
                    ]}
                />
            </View>

            <View style={styles.footer}>
                <Text
                    style={[
                        styles.percent,
                        {
                            color: colors.secondaryText,
                        },
                    ]}
                >
                    {percentage.toFixed(0)}% Used
                </Text>

                <View
                    style={[
                        styles.badge,
                        {
                            backgroundColor: statusColor,
                        },
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
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    badgeText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "bold",
    },
});