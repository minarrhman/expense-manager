import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
    createTransaction,
    updateTransaction,
    getCategories,
} from "../api/transactions";

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



    const filteredCategories = categories.filter(
        (cat) => cat.type === type
    );
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data.results);
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
            Alert.alert("Error", "Please fill required fields");
            return;
        }

        const payload = {
            amount: parseFloat(amount),
            type,
            category: selectedCategory,
            description,
            date: date.toISOString().split("T")[0],
        };

        try {

            if (isEdit) {

                await updateTransaction(editingTransaction.id, payload);

            } else {

                await createTransaction(payload);

            }

            navigation.goBack();

        } catch (error) {

            console.log(error);
            Alert.alert("Error", "Something went wrong");

        }

    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                {isEdit ? "Edit Transaction" : "Add Transaction"}
            </Text>

            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Select Type</Text>

            <View style={styles.typeContainer}>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "income" && styles.typeSelected
                    ]}
                    onPress={() => {
                        setType("income");
                        setSelectedCategory(null); // reset category
                    }}
                >
                    <Text style={{ color: type === "income" ? "#fff" : "#000" }}>
                        Income
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        type === "expense" && styles.typeSelected
                    ]}
                    onPress={() => {
                        setType("expense");
                        setSelectedCategory(null);
                    }}
                >
                    <Text style={{ color: type === "expense" ? "#fff" : "#000" }}>
                        Expense
                    </Text>
                </TouchableOpacity>
            </View>

            {type && (
                <>
                    <Text style={styles.label}>Select Category</Text>

                    <View style={styles.categoryContainer}>
                        {filteredCategories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === cat.id && styles.selectedCategory
                                ]}
                                onPress={() => setSelectedCategory(cat.id)}
                            >
                                <Text style={{
                                    color: selectedCategory === cat.id ? "#fff" : "#000"
                                }}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <TouchableOpacity style={styles.input}
                onPress={()=> setShowDatePicker(true)}>
                <Text>
                    {date ? date.toDateString() : 'Select Date'}
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
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    {isEdit ? "Update" : "Create"}
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },

    button: {
        backgroundColor: "#4F46E5",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 15,
    },

    categoryItem: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
    },

    selectedCategory: {
        backgroundColor: "#4F46E5",
        color: "#fff"
    },
    typeContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
    },

    typeButton: {
        flex: 1,
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },

    typeSelected: {
        backgroundColor: "#4F46E5",
    },
});