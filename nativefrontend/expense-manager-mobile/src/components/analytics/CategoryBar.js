import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CategoryBar({
    category,
    amount,
    percentage,
    color,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.category}>
                    {category}
                </Text>

                <Text style={styles.amount}>
                    ৳ {Number(amount).toLocaleString()}
                </Text>
            </View>

            <View style={styles.track}>
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

            <Text style={styles.percent}>
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
        color: "#666",
    },

    track: {
        width: "100%",
        height: 10,
        borderRadius: 10,
        backgroundColor: "#ECECEC",
        overflow: "hidden",
    },

    fill: {
        height: "100%",
        borderRadius: 10,
    },

    percent: {
        marginTop: 5,
        alignSelf: "flex-end",
        color: "#777",
        fontSize: 13,
    },
});