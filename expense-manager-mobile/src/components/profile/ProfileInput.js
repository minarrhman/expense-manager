import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from "react-native";

import { useTheme } from "../../theme/ThemeProvider";

export default function ProfileInput({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    editable = true,
}) {

    const { colors } = useTheme();

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

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: editable
                            ? colors.input
                            : colors.border,

                        borderColor: colors.border,

                        color: colors.text,
                    },
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.secondaryText}
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
    },

    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 16,
    },

});