import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import SettingItem from "./SettingItem";
import { useTheme } from "../../theme/ThemeProvider";

export default function SettingsSection({
    darkMode,
    setDarkMode,
    currency,
    onCurrencyPress,
    language,
    onLanguagePress,
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
                Settings
            </Text>

            <SettingItem
                icon="moon"
                title="Dark Mode"
                showSwitch
                switchValue={darkMode}
                onSwitchChange={setDarkMode}
            />

            <SettingItem
                icon="cash-outline"
                title="Currency"
                value={currency}
                onPress={onCurrencyPress}
            />

            <SettingItem
                icon="language-outline"
                title="Language"
                value={language}
                onPress={onLanguagePress}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        borderRadius: 16,
        paddingHorizontal: 18,
        marginTop: 20,
        elevation: 2,
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
        marginVertical: 18,
    },

});