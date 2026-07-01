import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function InputField({
    label,
    error,
    ...props
}) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: error ? "#EF4444" : colors.border,
                    },
                ]}
                placeholder={label}
                placeholderTextColor={colors.secondaryText}
                {...props}
            />

            {error && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },

    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
    },

    error: {
        color: "#EF4444",
        fontSize: 12,
        marginTop: 4,
    },
});