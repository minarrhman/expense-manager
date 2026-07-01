import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeProvider";

export default function SearchBar({
    value,
    onChange,
    onFilterPress,
}) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.filterButton,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                    },
                ]}
                onPress={onFilterPress}
            >
                <Ionicons
                    name="options-outline"
                    size={22}
                    color={colors.text}
                />
            </TouchableOpacity>

            <TextInput
                placeholder="Search transactions..."
                placeholderTextColor={colors.secondaryText}
                value={value}
                onChangeText={onChange}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: colors.border,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 10,
    },

    filterButton: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },

    input: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        fontSize: 16,
    },
});