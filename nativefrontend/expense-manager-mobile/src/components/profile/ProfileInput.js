import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";

export default function ProfileInput({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    editable = true,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={[
                    styles.input,
                    !editable && styles.disabledInput,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                editable={editable}
            />
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
        color: "#333",
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: "#FFF",
    },

    disabledInput: {
        backgroundColor: "#F5F5F5",
        color: "#777",
    },
});