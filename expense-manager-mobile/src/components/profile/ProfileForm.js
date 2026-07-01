import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import ProfileInput from "./ProfileInput";
import ProfileDatePicker from "./ProfileDatePicker";
import { useTheme } from "../../theme/ThemeProvider";

export default function ProfileForm({
    profile,
    setProfile,
    editing,
    setEditing,
    loadProfile,
}) {

    const { colors } = useTheme();

    const updateField = (field, value) => {
        setProfile({
            ...profile,
            [field]: value,
        });
    };

    const handleCancel = async () => {
        await loadProfile();
        setEditing(false);
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.card,
                },
            ]}
        >

            <View style={styles.header}>

                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.text,
                        },
                    ]}
                >
                    Personal Information
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        if (editing) {
                            handleCancel();
                        } else {
                            setEditing(true);
                        }
                    }}
                >
                    <Text
                        style={[
                            styles.editButton,
                            {
                                color: colors.primary,
                            },
                        ]}
                    >
                        {editing ? "Cancel" : "Edit"}
                    </Text>
                </TouchableOpacity>

            </View>

            {editing ? (

                <>
                    <ProfileInput
                        label="First Name"
                        value={profile?.first_name || ""}
                        placeholder="Enter first name"
                        onChangeText={(text) =>
                            updateField("first_name", text)
                        }
                    />

                    <ProfileInput
                        label="Last Name"
                        value={profile?.last_name || ""}
                        placeholder="Enter last name"
                        onChangeText={(text) =>
                            updateField("last_name", text)
                        }
                    />

                    <ProfileInput
                        label="Email"
                        value={profile?.email || ""}
                        placeholder="Enter email"
                        keyboardType="email-address"
                        onChangeText={(text) =>
                            updateField("email", text)
                        }
                    />

                    <ProfileDatePicker
                        label="Date of Birth"
                        value={profile?.date_of_birth}
                        onChange={(date) => {
                            const formattedDate =
                                new Date().toLocaleDateString("en-CA")

                            updateField(
                                "date_of_birth",
                                formattedDate
                            );
                        }}
                    />
                </>

            ) : (

                <View>

                    <View style={styles.infoItem}>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: colors.secondaryText,
                                },
                            ]}
                        >
                            First Name
                        </Text>

                        <Text
                            style={[
                                styles.value,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            {profile?.first_name || "-"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: colors.secondaryText,
                                },
                            ]}
                        >
                            Last Name
                        </Text>

                        <Text
                            style={[
                                styles.value,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            {profile?.last_name || "-"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: colors.secondaryText,
                                },
                            ]}
                        >
                            Email
                        </Text>

                        <Text
                            style={[
                                styles.value,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            {profile?.email || "-"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: colors.secondaryText,
                                },
                            ]}
                        >
                            Date of Birth
                        </Text>

                        <Text
                            style={[
                                styles.value,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            {profile?.date_of_birth || "Not Set"}
                        </Text>
                    </View>

                </View>

            )}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: 10,
        borderRadius: 16,
        padding: 20,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
    },

    editButton: {
        fontSize: 16,
        fontWeight: "600",
    },

    infoItem: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        marginBottom: 4,
    },

    value: {
        fontSize: 17,
        fontWeight: "500",
    },

});