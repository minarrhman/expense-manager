import React, { useCallback, useState } from "react";
import {
    View,
    FlatList,
    Alert,
    StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import FilterTabs from "../components/FilterTabs";
import TransactionCardDetailed from "../components/TransactionCardDetailed";

import {
    getTransactions,
    deleteTransaction,
} from "../api/transactions";

import { useTheme } from "../theme/ThemeProvider";

export default function TransactionsScreen({ navigation }) {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const { colors } = useTheme();

    useFocusEffect(
        useCallback(() => {
            setPage(1);
            setHasMore(true);
            fetchTransactions(1, false);
        }, [search, filter])
    );

    const fetchTransactions = async (
        pageNumber = 1,
        isLoadMore = false
    ) => {
        try {
            const data = await getTransactions(
                pageNumber,
                search,
                filter
            );

            if (isLoadMore) {
                setTransactions((prev) => [
                    ...prev,
                    ...data.results,
                ]);
            } else {
                setTransactions(data.results);
            }

            if (!data.next) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const loadMore = async () => {

        if (!hasMore || loadingMore) return;

        setLoadingMore(true);

        const nextPage = page + 1;
        setPage(nextPage);

        await fetchTransactions(nextPage, true);

        setLoadingMore(false);
    };

    const handleRefresh = async () => {

        setRefreshing(true);

        await fetchTransactions();

        setRefreshing(false);

    };

    const handleDelete = async (id) => {

        try {

            await deleteTransaction(id);

            setTransactions((prev) =>
                prev.filter((item) => item.id !== id)
            );

        } catch (error) {

            Alert.alert(
                "Error",
                "Failed to delete transaction."
            );

        }

    };

    const handleCardPress = (transaction) => {

        Alert.alert(
            transaction.category_name,
            "Choose an action",
            [
                {
                    text: "Edit",
                    onPress: () =>
                        navigation.navigate(
                            "TransactionForm",
                            { transaction }
                        ),
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () =>
                        handleDelete(transaction.id),
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ]
        );

    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >

            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <FilterTabs
                selected={filter}
                setSelected={setFilter}
            />

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TransactionCardDetailed
                        transaction={item}
                        onPress={handleCardPress}
                    />
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
    },

});