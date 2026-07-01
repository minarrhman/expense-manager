import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const BudgetWarningCard = ({ warnings }) => {
    const { colors } = useTheme();

    const getStatus = (item) => {
        if (item.spent > item.limit) return "danger";
        if (item.spent > item.limit * 0.8) return "warning";
        return "safe";
    };

    const getColor = (status) => {
        switch (status) {
            case "danger":
                return "#EF4444";
            case "warning":
                return "#F59E0B";
            default:
                return "#22C55E";
        }
    };

    if (!warnings || warnings.length === 0) {
        return (
            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    },
                ]}
            >
                <Text style={styles.safeText}>
                    ✅ All categories are within limit
                </Text>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                },
            ]}
        >
            <Text
                style={[
                    styles.header,
                    { color: colors.text },
                ]}
            >
                ⚠ Budget Alerts
            </Text>

            {warnings.map((item, index) => {
                const status = getStatus(item);
                const color = getColor(status);

                return (
                    <View key={index} style={styles.row}>
                        <Text
                            style={[
                                styles.text,
                                { color },
                            ]}
                        >
                            {status === "danger"
                                ? `🔴 ${item.category} exceeded by ৳${Number(item.exceeded_by).toLocaleString()}`
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
        padding: 15,
        borderRadius: 14,
        marginBottom: 15,
        borderWidth: 1,

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
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },

    row: {
        marginBottom: 8,
    },

    text: {
        fontSize: 14,
        fontWeight: "500",
    },

    safeText: {
        color: "#22C55E",
        fontSize: 14,
        fontWeight: "bold",
    },
});