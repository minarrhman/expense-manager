import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import ProfileInput from "./ProfileInput";
import ProfileDatePicker from "./ProfileDatePicker";

export default function ProfileForm({
    profile,
    setProfile,
    editing,
    setEditing,
    loadProfile,
}) {

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
        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.title}>
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
                    <Text style={styles.editButton}>
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
                            const formattedDate = date.toISOString().split("T")[0];

                            updateField("date_of_birth", formattedDate);
                        }}
                    />

                    <ProfileInput
                        label="Monthly Budget"
                        value={profile?.monthly_budget?.toString() || ""}
                        placeholder="Enter monthly budget"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                            updateField("monthly_budget", text)
                        }
                    />
                </>

            ) : (

                <View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>First Name</Text>
                        <Text style={styles.value}>
                            {profile?.first_name || "-"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Last Name</Text>
                        <Text style={styles.value}>
                            {profile?.last_name || "-"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>
                            {profile?.email || "-"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Text style={styles.value}>
                            {profile?.date_of_birth || "Not Set"}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Monthly Budget</Text>
                        <Text style={styles.value}>
                            ৳ {profile?.monthly_budget || "0"}
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
        color: "#222",
    },

    editButton: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4F46E5",
    },

    infoItem: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        color: "#777",
        marginBottom: 4,
    },

    value: {
        fontSize: 17,
        color: "#222",
        fontWeight: "500",
    },

});