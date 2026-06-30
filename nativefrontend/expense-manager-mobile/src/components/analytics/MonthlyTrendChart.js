import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function MonthlyTrendChart({ data }) {

    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Monthly Trend</Text>
                <Text style={styles.empty}>No data available.</Text>
            </View>
        );
    }

    const incomeData = data.map(item => ({
        value: item.income,
        label: item.label,
    }));

    const expenseData = data.map(item => ({
        value: item.expense,
        label: item.label,
    }));

    const totalIncome = data.reduce(
        (sum, item) => sum + item.income,
        0
    );

    const totalExpense = data.reduce(
        (sum, item) => sum + item.expense,
        0
    );

    const maxValue = Math.max(
        ...data.map(item => item.income),
        ...data.map(item => item.expense)
    );

    // Round to nearest 10,000
    const roundedMax = Math.ceil(maxValue / 10000) * 10000;

    const spacing = Math.max(40, 280 / data.length);
    const sections = 4;

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Monthly Trend
            </Text>

            <View style={styles.legendContainer}>

                <View style={styles.legendItem}>
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: "#16A34A" },
                        ]}
                    />

                    <Text style={styles.legendText}>
                        Income
                    </Text>

                    <Text style={styles.total}>
                        ৳ {totalIncome.toLocaleString()}
                    </Text>
                </View>

                <View style={styles.legendItem}>
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: "#DC2626" },
                        ]}
                    />

                    <Text style={styles.legendText}>
                        Expense
                    </Text>

                    <Text style={styles.total}>
                        ৳ {totalExpense.toLocaleString()}
                    </Text>
                </View>

            </View>

            <LineChart
                data={incomeData}
                data2={expenseData}

                pointerConfig={{
                    pointerStripHeight: 220,
                    pointerStripColor: "#D1D5DB",
                    pointerStripWidth: 2,

                    pointerColor: "#2563EB",
                    radius: 5,

                    activatePointersOnLongPress: true,

                    pointerLabelComponent: (items) => {
                        if (!items || items.length === 0) return null;

                        return (
                            <View
                                style={{
                                    width: 150,
                                    paddingVertical: 10,
                                    paddingHorizontal: 12,
                                    backgroundColor: "#fff",
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "#E5E7EB",
                                    elevation: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        fontSize: 15,
                                        marginTop:5,
                                        marginBottom: 2,
                                    }}
                                >
                                    {items[0].label}
                                </Text>

                                <Text
                                    style={{
                                        color: "#16A34A",
                                        marginBottom: 2,
                                    }}
                                >
                                    Income: ৳ {items[0].value.toLocaleString()}
                                </Text>

                                <Text
                                    style={{
                                        color: "#DC2626", marginTop:2
                                    }}
                                >
                                    Expense: ৳ {items[1].value.toLocaleString()}
                                </Text>
                            </View>
                        );
                    },
                }}

                curved
                isAnimated

                color="#16A34A"
                color2="#DC2626"

                thickness={3}
                thickness2={3}

                hideDataPoints={false}
                dataPointsRadius={5}

                dataPointsColor="#16A34A"
                dataPointsColor2="#DC2626"

                maxValue={roundedMax}
                noOfSections={sections}

                yAxisThickness={1}
                xAxisThickness={1}

                yAxisColor="#DDD"
                xAxisColor="#DDD"

                rulesColor="#ECECEC"

                spacing={spacing}

                yAxisLabelTexts={[
                    "0",
                    `${roundedMax / 4 / 1000}k`,
                    `${roundedMax / 2 / 1000}k`,
                    `${(roundedMax * 3) / 4 / 1000}k`,
                    `${roundedMax / 1000}k`,
                ]}

                hideRules={false}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,

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
        marginBottom: 16,
    },

    legendContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    legendItem: {
        flexDirection: "column",
    },

    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginBottom: 6,
    },

    legendText: {
        fontSize: 14,
        color: "#666",
    },

    total: {
        marginTop: 2,
        fontWeight: "700",
        fontSize: 16,
    },

    empty: {
        color: "#888",
    },

});