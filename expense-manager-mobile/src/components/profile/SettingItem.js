import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export default function SettingItem({
    icon,
    title,
    value,
    showSwitch = false,
    switchValue = false,
    onSwitchChange,
    onPress,
}) {

    const { colors, isDark } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    borderBottomColor: colors.border,
                },
            ]}
            activeOpacity={0.7}
            onPress={showSwitch ? undefined : onPress}
        >
            <View style={styles.left}>

                <Ionicons
                    name={icon}
                    size={22}
                    color={colors.primary}
                />

                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    {title}
                </Text>

            </View>

            {showSwitch ? (
                <Switch
                    value={switchValue}
                    onValueChange={onSwitchChange}
                    trackColor={{
                        false: colors.border,
                        true: colors.primary,
                    }}
                    thumbColor={
                        isDark
                            ? colors.card
                            : "#FFFFFF"
                    }
                />
            ) : (
                <View style={styles.right}>

                    {value && (
                        <Text
                            style={[
                                styles.value,
                                {
                                    color: colors.secondaryText,
                                },
                            ]}
                        >
                            {value}
                        </Text>
                    )}

                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={colors.secondaryText}
                    />

                </View>
            )}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 18,
        borderBottomWidth: 1,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        marginLeft: 14,
        fontSize: 16,
        fontWeight: "500",
    },

    right: {
        flexDirection: "row",
        alignItems: "center",
    },

    value: {
        marginRight: 6,
        fontSize: 15,
    },

});