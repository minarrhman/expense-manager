import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Icon, { getCategoryIcon } from "../utils/categoryIcons"
import { sendBudgetNotification } from "../utils/notifications"
import { useTheme } from "../theme/ThemeProvider";
import { useToast } from "../components/common/ToastProvider";

import {
    createTransaction,
    updateTransaction,
    getCategories,
} from "../api/transactions";
import { getCategoryLimits } from "../api/categoryLimit";

export default function TransactionFormScreen({ route, navigation }) {

    const editingTransaction = route.params?.transaction;

    const isEdit = !!editingTransaction;

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { colors } = useTheme();
    const { showToast } = useToast();



    const checkBudgetWarnings = (budgets) => {
        budgets.results.forEach((budget) => {
            
            if (budget.status === "warning"){
                sendBudgetNotification(
                    "⚠️ Budget Warning",
                    `${budget.category_name} is used ${budget.percentage_used}% used`
                )
            }
            if (budget.warning === "exceeded"){
                sendBudgetNotification(
                    "🚨 Budget Limit Exceeded",
                    `${budget.category_name} is exceeded by ${Math.abs(budget.remaining)}%`
                )
            }
        });
    }
    const filteredCategories = categories.filter(
        (cat) => cat.type === type
    );
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setDate(selectedDate);
        }
    }

    // Load data in edit mode
    useEffect(() => {

        if (isEdit) {
            setAmount(String(editingTransaction.amount));
            setType(editingTransaction.type);
            setSelectedCategory(editingTransaction.category);
            setDescription(editingTransaction.description || "");
            setDate(new Date(editingTransaction.date));
        }

    }, [isEdit]);

    const handleSubmit = async () => {

        if (!amount || !selectedCategory || !date) {
            showToast("Please fill required fields.", "error");
            return;
        }

        const payload = {
            amount: parseFloat(amount),
            type,
            category: selectedCategory,
            description,
            date: date.toLocaleDateString("en-CA")
        };

        try {

            if (isEdit) {

                await updateTransaction(editingTransaction.id, payload);
                const budgets = await getCategoryLimits();
                checkBudgetWarnings(budgets);
            } else {

                await createTransaction(payload);
                const budgets = await getCategoryLimits();
                checkBudgetWarnings(budgets);

            }
            showToast(
                isEdit
                    ? "Transaction updated."
                    : "Transaction created.",
                "success"
            );

            navigation.goBack();

        } catch (error) {

            console.log(error);
            showToast("Something went wrong.", "error");

        }

    };

    return (
        <KeyboardAwareScrollView
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={20}
        >

            <Text
                style={[
                    styles.title,
                    {
                        color: colors.text,
                    },
                ]}
            >
                {isEdit ? "Edit Transaction" : "Add Transaction"}
            </Text>

            <TextInput
                placeholder="Amount"
                placeholderTextColor={colors.secondaryText}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: colors.border,
                    },
                ]}
            />

            <Text
                style={[
                    styles.label,
                    {
                        color: colors.text,
                    },
                ]}
            >
                Select Type
            </Text>

            <View style={styles.typeContainer}>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        {
                            backgroundColor:
                                type === "income"
                                    ? colors.primary
                                    : colors.card,
                            borderColor: colors.border,
                        },
                    ]}
                    onPress={() => {
                        setType("income");
                        setSelectedCategory(null);
                    }}
                >
                    <Text
                        style={{
                            color:
                                type === "income"
                                    ? "#fff"
                                    : colors.text,
                        }}
                    >
                        Income
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        {
                            backgroundColor:
                                type === "expense"
                                    ? colors.primary
                                    : colors.card,
                            borderColor: colors.border,
                        },
                    ]}
                    onPress={() => {
                        setType("expense");
                        setSelectedCategory(null);
                    }}
                >
                    <Text
                        style={{
                            color:
                                type === "expense"
                                    ? "#fff"
                                    : colors.text,
                        }}
                    >
                        Expense
                    </Text>
                </TouchableOpacity>

            </View>

            {type && (
                <>
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

                    <View style={styles.categoryContainer}>
                        {filteredCategories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryItem,
                                    {
                                        backgroundColor:
                                            selectedCategory === cat.id
                                                ? colors.primary
                                                : colors.card,
                                        borderColor: colors.border,
                                    },
                                ]}
                                onPress={() =>
                                    setSelectedCategory(cat.id)
                                }
                            >
                                <View style={styles.categoryContent}>
                                    <Icon
                                        name={getCategoryIcon(cat.name)}
                                        size={18}
                                        color={
                                            selectedCategory === cat.id
                                                ? "#fff"
                                                : colors.primary
                                        }
                                    />

                                    <Text
                                        style={[
                                            styles.categoryText,
                                            {
                                                color:
                                                    selectedCategory === cat.id
                                                        ? "#fff"
                                                        : colors.text,
                                            },
                                        ]}
                                    >
                                        {cat.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            <TextInput
                placeholder="Description"
                placeholderTextColor={colors.secondaryText}
                value={description}
                onChangeText={setDescription}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: colors.border,
                    },
                ]}
            />

            <TouchableOpacity
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    },
                ]}
                onPress={() => setShowDatePicker(true)}
            >
                <Text
                    style={{
                        color: colors.text,
                    }}
                >
                    {date ? date.toDateString() : "Select Date"}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    {isEdit ? "Update" : "Create"}
                </Text>
            </TouchableOpacity>

        </KeyboardAwareScrollView>
    );
};
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

    input: {
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
    },

    button: {
        padding: 15,
        borderRadius: 12,
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    },

    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 18,
    },

    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1,
    },

    typeContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 18,
    },

    typeButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 1,
    },

    categoryContent: {
        flexDirection: "row",
        alignItems: "center",
    },

    categoryText: {
        marginLeft: 8,
        fontWeight: "600",
    },
});