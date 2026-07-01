import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import { useTheme } from "../theme/ThemeProvider";

export default function FloatingAddButton({ onPress }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: colors.primary,
                    borderColor: colors.card,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 70,
        right: 20,

        width: 56,
        height: 56,
        borderRadius: 28,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 2,

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 6,
    },

    text: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: -2,
    },
});