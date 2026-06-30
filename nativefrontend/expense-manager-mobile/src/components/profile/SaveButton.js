import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

export default function SaveButton({
    title = "Save Changes",
    onPress,
    loading = false,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                loading && styles.disabledButton,
            ]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        backgroundColor: "#4F46E5",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    disabledButton: {
        opacity: 0.7,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },
});