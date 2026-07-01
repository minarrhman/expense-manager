import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import { useTheme } from "../theme/ThemeProvider";

export default function FilterTabs({ selected, setSelected }) {
    const { colors } = useTheme();

    const tabs = ["all", "income", "expense"];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.button,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.border,
                        },
                        selected === tab && {
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                        },
                    ]}
                    onPress={() => setSelected(tab)}
                >
                    <Text
                        style={[
                            styles.text,
                            {
                                color:
                                    selected === tab
                                        ? "#FFF"
                                        : colors.text,
                            },
                        ]}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
    },

    button: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
    },

    text: {
        fontWeight: "500",
    },
});