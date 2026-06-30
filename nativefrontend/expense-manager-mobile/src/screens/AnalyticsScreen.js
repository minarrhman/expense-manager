import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SummaryCards from "../components/analytics/SummaryCards";
import CategoryBreakdown from "../components/analytics/CategoryBreakdown";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import {
    getReportSummary,
    getCategoryBreakdown,
    getMonthlyTrend,
} from "../api/analytics";

export default function AnalyticsScreen() {
    const [summary, setSummary] = useState(null);
    const [categories, setCategories] = useState([]);
    const [monthlyTrend, setMonthlyTrend] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadAnalytics = async () => {
        try {
            const [
                summaryData,
                categoryData,
                trendData,
            ] = await Promise.all([
                getReportSummary(),
                getCategoryBreakdown(),
                getMonthlyTrend(),
            ]);

            setSummary(summaryData);
            setCategories(categoryData);
            setMonthlyTrend(trendData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            loadAnalytics();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadAnalytics();
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading analytics...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                <SummaryCards summary={summary} />

                <CategoryBreakdown
                    categories={categories}
                />

                <MonthlyTrendChart data={monthlyTrend} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});