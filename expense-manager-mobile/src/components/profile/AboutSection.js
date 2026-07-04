import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export default function AboutSection({ onPress }) {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.card,
                },
            ]}
        >
            <TouchableOpacity
                style={styles.item}
                onPress={onPress}
            >
                <View style={styles.left}>
                    <Ionicons
                        name="information-circle-outline"
                        size={22}
                        color={colors.primary}
                    />

                    <Text
                        style={[
                            styles.text,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        About ExpenseFlow
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.secondaryText}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 14,
        marginTop: 20,
        marginBottom: 20,
        overflow: "hidden",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
    },

    text: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 12,
    },
});