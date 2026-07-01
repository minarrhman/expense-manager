import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import SettingItem from "./SettingItem";
import { useTheme } from "../../theme/ThemeProvider";

export default function AccountSection({
    onChangePassword,
    onLogout,
}) {

    const { colors } = useTheme();

    return (

        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.card,
                },
            ]}
        >

            <Text
                style={[
                    styles.heading,
                    {
                        color: colors.text,
                    },
                ]}
            >
                Account
            </Text>

            <SettingItem
                icon="lock-closed-outline"
                title="Change Password"
                onPress={onChangePassword}
            />

            <SettingItem
                icon="log-out-outline"
                title="Logout"
                onPress={onLogout}
            />

        </View>

    );
}

const styles = StyleSheet.create({

    card: {
        borderRadius: 16,
        paddingHorizontal: 18,
        marginTop: 20,
        marginBottom: 40,
        elevation: 2,
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
        marginVertical: 18,
    },

});