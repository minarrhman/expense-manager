import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    View,
    Alert,
} from "react-native";

import { removeToken } from "../utils/storage";
import { getProfile,updateProfile } from "../api/profile";
import { useTheme } from "../theme/ThemeProvider";
import {useToast} from "../components/common/ToastProvider";
import SettingsSection from "../components/profile/SettingsSection";
import AccountSection from "../components/profile/AccountSection";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileForm from "../components/profile/ProfileForm";
import SaveButton from "../components/profile/SaveButton";

export default function ProfileScreen() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currency, setCurrency] = useState("BDT");
    const [language] = useState("English");
    const {showToast} = useToast();
    const navigation = useNavigation();
    const {
        isDark,
        toggleTheme,
        colors,
    } = useTheme()

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        try {
            setSaving(true);

            await updateProfile(profile);

            setEditing(false);
            await loadProfile();
            showToast("Profile updated successfully")

        } catch (error) {
            console.log(error);
            showToast("Unable to update profile.",'error');

        } finally {
            setSaving(false);
        }
    };
    const handleCurrencyPress = () => {
        Alert.alert(
            "Currency",
            "Currency selection will be added in the next update."
        );
    };

    const handleLanguagePress = () => {
        showToast("Language support coming soon!", "info");
    };

    const handleChangePassword = () => {
        showToast("Change Password feature coming soon!", "info");
    };

    const handleLogout = () => {

        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {

                        await removeToken();

                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "Login",
                                },
                            ],
                        });

                    },
                },
            ]
        );

    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView
            style={[
                styles.container,
            {
                backgroundColor:colors.background,
            },]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <ProfileHeader profile={profile} setProfile={setProfile} />
            <ProfileForm
                profile={profile}
                setProfile={setProfile}
                editing={editing}
                setEditing={setEditing}
                loadProfile={loadProfile}
            />

            {editing && (
                <SaveButton loading={saving} onPress={handleSave} />
            )}
            <SettingsSection
                darkMode={isDark}
                setDarkMode={toggleTheme}
                currency={currency}
                language={language}
                onCurrencyPress={handleCurrencyPress}
                onLanguagePress={handleLanguagePress}
            />

            
            <AccountSection
                onChangePassword={handleChangePassword}
                onLogout={handleLogout}
            />
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});