import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import Icon, { getCategoryIcon } from "../utils/categoryIcons";

import { getCategories } from "../api/transactions";

import {
    createCategoryLimit,
    updateCategoryLimit,
    deleteCategoryLimit,
    getCategoryLimits,
} from "../api/categoryLimit";
import { useTheme } from "../theme/ThemeProvider";
import { useToast } from "../components/common/ToastProvider";

export default function AddEditBudgetLimitScreen({
    route,
    navigation,
}) {
    const editingBudget = route.params?.budget;

    const isEdit = !!editingBudget;

    const { colors } = useTheme();
    const { showToast } = useToast();
    const [categories, setCategories] = useState([]);
    const [budgetLimits, setBudgetLimits] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [limit, setLimit] = useState("");

    useEffect(() => {
        fetchCategories();
        fetchBudgetLimits();
    }, []);

    useEffect(() => {
        if (isEdit) {
            setSelectedCategory(editingBudget.category);
            setLimit(String(editingBudget.limit));
        }
    }, [isEdit]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();

            const expenseCategories = data.filter(
                (cat) => cat.type === "expense"
            );

            setCategories(expenseCategories);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchBudgetLimits = async () => {
        try {
            const data = await getCategoryLimits();
            setBudgetLimits(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        if (!selectedCategory) {
            showToast("Please select a category", "error");
            return;
        }

        if (!limit || Number(limit) <= 0) {
            showToast("Please enter a valid limit", "error");
            return;
        }

        const payload = {
            category: selectedCategory,
            limit: parseFloat(limit),
        };

        try {
            if (isEdit) {
                console.log(typeof updateCategoryLimit);
                console.log(updateCategoryLimit);
                await updateCategoryLimit(
                    editingBudget.id,
                    payload
                );

                showToast("Budget updated");
            } else {
                await createCategoryLimit(payload);

                showToast("Budget created");
            }

            navigation.goBack();
        } catch (error) {
            console.error(error);
            showToast("Something went wrong", "error");
        }
    };

    const handleDelete = async () => {
        if (!isEdit) return;

        try {
            await deleteCategoryLimit(editingBudget.id);

            showToast("Budget deleted");

            navigation.goBack();
        } catch (error) {
            console.log(error);

            showToast("Unable to delete budget", "error");
        }
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

            <Text
                style={[
                    styles.title,
                    {
                        color: colors.text,
                    },
                ]}
            >
                {isEdit
                    ? "Edit Budget Limit"
                    : "Set Budget Limit"}
            </Text>

            <Text
                style={[
                    styles.label,
                    {
                        color: colors.text,
                    },
                ]}
            >
                Select Category
            </Text>

            {isEdit ? (
                <View style={styles.categoryContainer}>
                    {categories
                        .filter((cat) => cat.id === selectedCategory)
                        .map((cat) => (
                            <View
                                key={cat.id}
                                style={[
                                    styles.categoryItem,
                                    styles.selectedCategory,
                                    {
                                        backgroundColor: colors.primary,
                                    },
                                ]}
                            >
                                <View style={styles.categoryContent}>
                                    <Icon
                                        name={getCategoryIcon(cat.name)}
                                        size={18}
                                        color="#fff"
                                    />

                                    <Text
                                        style={[
                                            styles.categoryText,
                                            { color: "#fff" },
                                        ]}
                                    >
                                        {cat.name}
                                    </Text>
                                </View>
                            </View>
                        ))}
                </View>
            ) : (
                <View style={styles.categoryContainer}>
                    {categories.map((cat) => {
                        const alreadyHasBudget = budgetLimits.some(
                            (budget) => budget.category === cat.id
                        );

                        return (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryItem,
                                    {
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                    },
                                    alreadyHasBudget &&
                                    styles.disabledCategory,
                                    selectedCategory === cat.id && [
                                        styles.selectedCategory,
                                        {
                                            backgroundColor: colors.primary,
                                            borderColor: colors.primary,
                                        },
                                    ],
                                ]}
                                disabled={alreadyHasBudget}
                                onPress={() =>
                                    setSelectedCategory(cat.id)
                                }
                            >
                                <View style={styles.categoryContent}>
                                    <Icon
                                        name={getCategoryIcon(cat.name)}
                                        size={18}
                                        color={
                                            alreadyHasBudget
                                                ? "#9CA3AF"
                                                : selectedCategory === cat.id
                                                    ? "#fff"
                                                    : colors.primary
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.categoryText,
                                            {
                                                color:
                                                    alreadyHasBudget
                                                        ? "#9CA3AF"
                                                        : selectedCategory === cat.id
                                                            ? "#fff"
                                                            : colors.text,
                                            },
                                        ]}
                                    >
                                        {cat.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            <Text
                style={[
                    styles.label,
                    {
                        color: colors.text,
                    },
                ]}
            >
                Budget Limit
            </Text>

            <TextInput
                value={limit}
                onChangeText={setLimit}
                keyboardType="numeric"
                placeholder="Enter budget amount"
                placeholderTextColor={colors.secondaryText}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        borderColor: colors.border,
                        color: colors.text,
                    },
                ]}
            />

            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
                onPress={handleSave}
            >
                <Text style={styles.buttonText}>
                    {isEdit
                        ? "Update Budget"
                        : "Save Budget"}
                </Text>
            </TouchableOpacity>

            {isEdit && (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <Text style={styles.deleteButtonText}>
                        Delete Budget
                    </Text>
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
    },

    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 20,
    },

    categoryItem: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
    },

    selectedCategory: {
        // Background & border color now come from the theme
    },

    categoryContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    categoryText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "600",
    },

    input: {
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
    },

    button: {
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    deleteButton: {
        backgroundColor: "#DC2626",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 15,
    },

    deleteButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

});