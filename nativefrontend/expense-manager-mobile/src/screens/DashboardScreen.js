import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import HeaderSection from "../components/HeaderSection";
import BalanceCard from "../components/BalanceCard";
import SummaryCards from "../components/SummaryCards";
import AIInsightCard from "../components/AIInsightCard";
import BudgetWarningCard from "../components/BudgetWarningCard";
import RecentTransactionsCard from "../components/RecentTransactionsCard";

import { getDashboard } from "../api/dashboard";

const DashboardScreen = ({ navigation }) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
        fetchDashboard();
    }, []));

    const fetchDashboard = async () => {
        try {
            const res = await getDashboard();
            setData(res);
        } catch (err) {
            console.log("Dashboard error:", err);
            navigation.replace("Login");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading dashboard...</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.center}>
                <Text>Failed to load dashboard</Text>
            </View>
        );
    }
    return (
        <ScrollView style={styles.container}>

            <HeaderSection username={data.name} />

            <BalanceCard
                balance={data?.balance}
                income={data?.total_income}
                expense={data?.total_expense}
            />

            <SummaryCards
                income={data?.total_income}
                expense={data?.total_expense}
            />

            <AIInsightCard
                type={data?.ai_insight?.type}
                title={data?.ai_insight?.title}
                message={data?.ai_insight?.message}
            />

            <BudgetWarningCard
                warnings={data?.category_warnings || []}
            />

            <RecentTransactionsCard
                transactions={data?.recent_transactions || []}
            />

        </ScrollView>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f7fb",
        padding: 12,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});