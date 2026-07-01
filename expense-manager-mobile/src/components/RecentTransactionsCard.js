import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import TransactionCard from "./TransactionCard";
import { useTheme } from "../theme/ThemeProvider";

const RecentTransactionsCard = ({ transactions,onPress }) => {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                },
            ]}
        >
            <Text
                style={[
                    styles.header,
                    {
                        color: colors.text,
                    },
                ]}
            >
                🧾 Recent Transactions
            </Text>

            {transactions.map((item, index) => (
                <TransactionCard
                    key={index}
                    type={item.type}
                    amount={item.amount}
                    category={item.category_name}
                />
            ))}

            <TouchableOpacity
            onPress={onPress}>
                <Text
                    style={[
                        styles.seeAll,
                        {
                            color: colors.primary,
                        },
                    ]}
                >
                    See All →
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default RecentTransactionsCard;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 14,
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

    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10,
    },

    seeAll: {
        marginTop: 10,
        fontWeight: "600",
        textAlign: "left",
    },
});