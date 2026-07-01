import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { useToast } from "../common/ToastProvider";
import { useTheme } from "../../theme/ThemeProvider";
import { updateProfilePhoto } from "../../api/profile";

export default function ProfileHeader({ profile, setProfile }) {

    const [uploading, setUploading] = useState(false);

    const { showToast } = useToast();
    const { colors } = useTheme();

    const pickImage = async () => {

        if (uploading) return;

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {

            showToast(
                "Please allow access to your gallery.",
                "warning"
            );

            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
            base64: true,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        const mimeType = asset.mimeType || "image/jpeg";

        const base64Image =
            `data:${mimeType};base64,${asset.base64}`;

        const previousPhoto = profile.profile_photo;

        // Show the new image immediately
        setProfile({
            ...profile,
            profile_photo: base64Image,
        });

        try {

            setUploading(true);

            await updateProfilePhoto(base64Image);

            showToast(
                "Profile picture updated successfully.",
                "success"
            );

        } catch (error) {

            console.log(error);

            // Restore previous image
            setProfile({
                ...profile,
                profile_photo: previousPhoto,
            });

            showToast(
                "Unable to update your profile picture.",
                "error"
            );

        } finally {

            setUploading(false);

        }

    };

    const fullName =
        `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim();

    const imageSource = profile?.profile_photo
        ? { uri: profile.profile_photo }
        : require("../../../assets/default-profile.png");

    return (

        <View style={styles.container}>

            <View style={styles.imageContainer}>

                <Image
                    source={imageSource}
                    style={[
                        styles.image,
                        {
                            backgroundColor: colors.border,
                        },
                    ]}
                />

                <TouchableOpacity
                    style={[
                        styles.cameraButton,
                        {
                            backgroundColor: colors.primary,
                        },
                    ]}
                    onPress={pickImage}
                    disabled={uploading}
                >

                    {uploading ? (
                        <ActivityIndicator
                            size="small"
                            color="#FFF"
                        />
                    ) : (
                        <Ionicons
                            name="camera"
                            size={20}
                            color="#FFF"
                        />
                    )}

                </TouchableOpacity>

            </View>

            <Text
                style={[
                    styles.name,
                    {
                        color: colors.text,
                    },
                ]}
            >
                {fullName || "Your Name"}
            </Text>

            <Text
                style={[
                    styles.username,
                    {
                        color: colors.secondaryText,
                    },
                ]}
            >
                @{profile?.username}
            </Text>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        alignItems: "center",
        marginBottom: 30,
    },

    imageContainer: {
        position: "relative",
    },

    image: {
        width: 130,
        height: 130,
        borderRadius: 65,
    },

    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,

        width: 38,
        height: 38,

        borderRadius: 19,

        justifyContent: "center",
        alignItems: "center",
    },

    name: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 15,
    },

    username: {
        marginTop: 4,
        fontSize: 16,
    },

});