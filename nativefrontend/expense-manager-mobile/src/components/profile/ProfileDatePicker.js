import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function ProfileDatePicker({
    label,
    value,
    onChange,
}) {
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (event, selectedDate) => {
        setShowPicker(false);

        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    const formatDate = (date) => {
        if (!date) return "Select Date";

        const d = new Date(date);

        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.label}>
                {label}
            </Text>

            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowPicker(true)}
            >
                <Text style={styles.dateText}>
                    {formatDate(value)}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={handleChange}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 16,
        backgroundColor: "#FFF",
    },

    dateText: {
        fontSize: 16,
        color: "#333",
    },

});