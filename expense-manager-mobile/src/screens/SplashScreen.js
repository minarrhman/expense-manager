import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { getToken } from "../utils/storage";
import { requestNotificationPermission} from "../utils/notifications"


export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let isMounted = true;
        requestNotificationPermission();

        const startApp = async () => {
            try {
                // Start both tasks in parallel
                const tokenPromise = getToken();

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }).start();

                const token = await tokenPromise;

                // Ensure splash is visible minimum duration
                setTimeout(() => {
                    if (!isMounted) return;

                    if (token) {
                        navigation.replace("Main");
                    } else {
                        navigation.replace("Login");
                    }
                }, 1200); // matches animation duration
            } catch (e) {
                navigation.replace("Login");
            }
        };

        startApp();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../../assets/logo.png")}
                style={[
                    styles.logo,
                    { opacity: fadeAnim },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logo: {
        width: 220,
        height: 220,
        resizeMode: "contain",
    },
});