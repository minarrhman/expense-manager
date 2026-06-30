import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function FloatingAddButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 70,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#4f46e5",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    text: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
    },
});