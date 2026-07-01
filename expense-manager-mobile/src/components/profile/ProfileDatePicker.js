import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useTheme } from "../../theme/ThemeProvider";

export default function ProfileDatePicker({
    label,
    value,
    onChange,
}) {

    const { colors } = useTheme();

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

            <Text
                style={[
                    styles.label,
                    {
                        color: colors.text,
                    },
                ]}
            >
                {label}
            </Text>

            <TouchableOpacity
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.input,
                        borderColor: colors.border,
                    },
                ]}
                onPress={() => setShowPicker(true)}
            >

                <Text
                    style={[
                        styles.dateText,
                        {
                            color: value
                                ? colors.text
                                : colors.secondaryText,
                        },
                    ]}
                >
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
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 16,
    },

    dateText: {
        fontSize: 16,
    },

});