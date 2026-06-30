import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {getCategoryColor} from "../../utils/categoryColors"
import CategoryBar from "./CategoryBar";

export default function CategoryBreakdown({ categories }) {
    if (!categories.length) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>
                    Category Breakdown
                </Text>

                <Text style={styles.empty}>
                    No expenses found.
                </Text>
            </View>
        );
    }

    const totalExpense = categories.reduce(
        (sum, item) => sum + Number(item.total),
        0
    );

    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Category Breakdown
            </Text>

            {categories.map((item, index) => (
                <CategoryBar
                    key={item.category_id}
                    category={item.category_name}
                    amount={item.total}
                    percentage={(item.total / totalExpense) * 100}
                    color={getCategoryColor(index)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },

        elevation: 3,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 18,
    },

    empty: {
        color: "#888",
    },
});