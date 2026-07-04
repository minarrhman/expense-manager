import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { registerUser } from "../api/auth";
import InputField from "../components/InputField";
import { useTheme } from "../theme/ThemeProvider";

export default function RegisterScreen({ navigation }) {
    const { colors } = useTheme();

    const [errors, setErrors] = useState({});
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleRegister = async () => {
        setErrors({});

        if (password !== confirmPassword) {
            setErrors({
                confirmPassword: "Passwords do not match",
            });
            return;
        }

        try {
            const formattedDate = date
                .toISOString()
                .split("T")[0];

            await registerUser(
                first_name,
                last_name,
                email,
                username,
                password,
                formattedDate
            );

            alert("Registration Successful");

            navigation.replace("Login");
        } catch (errorData) {
            let newErrors = {};

            for (const field in errorData) {
                if (Array.isArray(errorData[field])) {
                    newErrors[field] = errorData[field][0];
                } else {
                    newErrors[field] = errorData[field];
                }
            }

            setErrors(newErrors);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={20}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
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
                            styles.title,
                            {
                                color: colors.text,
                            },
                        ]}
                    >
                        Create Account
                    </Text>

                    <InputField
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        error={errors.username}
                    />

                    <InputField
                        label="First Name"
                        value={first_name}
                        onChangeText={setFirstName}
                    />

                    <InputField
                        label="Last Name"
                        value={last_name}
                        onChangeText={setLastName}
                    />

                    <InputField
                        label="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                    />

                    <InputField
                        label="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <InputField
                        label="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        error={errors.confirmPassword}
                    />

                    <TouchableOpacity
                        style={[
                            styles.dateButton,
                            {
                                backgroundColor: colors.input,
                                borderColor: colors.border,
                            },
                        ]}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text
                            style={[
                                styles.dateText,
                                {
                                    color: colors.text,
                                },
                            ]}
                        >
                            {date.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>

                    {errors.date_of_birth && (
                        <Text style={styles.errorText}>
                            {errors.date_of_birth}
                        </Text>
                    )}

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);

                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity
                        style={[
                            styles.registerButton,
                            {
                                backgroundColor: colors.primary,
                            },
                        ]}
                        onPress={handleRegister}
                    >
                        <Text style={styles.registerButtonText}>
                            Register
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Login")
                        }
                    >
                        <Text
                            style={[
                                styles.loginLink,
                                {
                                    color: colors.primary,
                                },
                            ]}
                        >
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    card: {
        width: "100%",
        maxWidth: 400,
        padding: 25,
        borderRadius: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        elevation: 5,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
    },

    dateButton: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        marginBottom: 20,
    },

    dateText: {
        fontSize: 15,
    },

    errorText: {
        color: "#EF4444",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    },

    registerButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    registerButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    loginLink: {
        textAlign: "center",
        marginTop: 15,
        fontWeight: "600",
    },
});