import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    View,
    Alert,
} from "react-native";

import { getProfile,updateProfile } from "../api/profile";
import {useToast} from "../components/common/ToastProvider";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileForm from "../components/profile/ProfileForm";
import SaveButton from "../components/profile/SaveButton";

export default function ProfileScreen() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const {showToast} = useToast();

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

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
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