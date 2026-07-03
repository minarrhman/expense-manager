import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import loginUser from "../api/auth";
import { saveToken } from "../utils/storage";
import { useTheme } from "../theme/ThemeProvider";

export default function LoginScreem({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { colors } = useTheme();

    const handleLogin = async () => {
        try {
            const data = await loginUser(username, password);

            await saveToken(data.access);

            navigation.replace("Main");
        } catch (error) {
            console.log(error);
            alert("Invalid Credentials");
        }
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
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
                Expense Flow
            </Text>

            <Text
                style={[
                    styles.subtitle,
                    {
                        color: colors.secondaryText,
                    },
                ]}
            >
                Welcome
            </Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: colors.border,
                    },
                ]}
                placeholder="Username"
                placeholderTextColor={colors.secondaryText}
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: colors.border,
                    },
                ]}
                placeholder="Password"
                placeholderTextColor={colors.secondaryText}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={[
                    styles.loginButton,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>
                    Login
                </Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text
                    style={{
                        color: colors.secondaryText,
                    }}
                >
                    Don't have an account?
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Register")
                    }
                >
                    <Text
                        style={[
                            styles.registerText,
                            {
                                color: colors.primary,
                            },
                        ]}
                    >
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        textAlign: "center",
        marginBottom: 40,
        fontSize: 16,
    },

    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 14,
        marginBottom: 15,
        fontSize: 16,
    },

    loginButton: {
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    loginButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },

    registerText: {
        fontWeight: "bold",
        marginLeft: 5,
    },
});