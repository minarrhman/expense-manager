import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { useTheme } from "../theme/ThemeProvider";

const StatusBadge = ({ status }) => {
    const { colors } = useTheme();

    const config = {
        safe: {
            color: "#16A34A",
            background: "#DCFCE7",
            text: "SAFE",
        },
        warning: {
            color: "#D97706",
            background: "#FEF3C7",
            text: "WARNING",
        },
        exceeded: {
            color: "#DC2626",
            background: "#FEE2E2",
            text: "EXCEEDED",
        },
    };

    const current = config[status] || config.safe;

    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: current.background,
                    borderColor: colors.border,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    { color: current.color },
                ]}
            >
                {current.text}
            </Text>
        </View>
    );
};

export default StatusBadge;

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
    },

    text: {
        fontSize: 11,
        fontWeight: "700",
    },
});