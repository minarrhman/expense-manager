import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function AboutScreen() {
    const { colors } = useTheme();

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
            contentContainerStyle={styles.content}
        >
            <Image
                source={require("../../assets/icon.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text
                style={[
                    styles.title,
                    { color: colors.text },
                ]}
            >
                ExpenseFlow
            </Text>

            <Text
                style={[
                    styles.version,
                    { color: colors.secondaryText },
                ]}
            >
                Version 1.0.0
            </Text>

            <Text
                style={[
                    styles.description,
                    { color: colors.text },
                ]}
            >
                ExpenseFlow is a personal finance application designed to
                help users track income and expenses, manage monthly budgets,
                and gain better insights into their spending habits through
                simple analytics and intelligent financial summaries.
            </Text>

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
                        styles.cardTitle,
                        { color: colors.text },
                    ]}
                >
                    Features
                </Text>

                <Text style={[styles.feature, { color: colors.text }]}>
                    • Track income and expenses
                </Text>

                <Text style={[styles.feature, { color: colors.text }]}>
                    • Monthly budget limits
                </Text>

                <Text style={[styles.feature, { color: colors.text }]}>
                    • Spending analytics
                </Text>

                <Text style={[styles.feature, { color: colors.text }]}>
                    • AI-powered financial insights
                </Text>

                <Text style={[styles.feature, { color: colors.text }]}>
                    • Secure user accounts
                </Text>
            </View>

            <Text
                style={[
                    styles.footer,
                    { color: colors.secondaryText },
                ]}
            >
                © 2026 ExpenseFlow
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: 25,
        alignItems: "center",
    },

    logo: {
        width: 110,
        height: 110,
        marginTop: 30,
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
    },

    version: {
        marginTop: 6,
        fontSize: 15,
        marginBottom: 25,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 30,
    },

    card: {
        width: "100%",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 15,
    },

    feature: {
        fontSize: 16,
        marginBottom: 10,
    },

    footer: {
        marginTop: 35,
        fontSize: 14,
    },
});