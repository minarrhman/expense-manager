import React, { useEffect } from "react";
import {
    Animated,
    StyleSheet,
    Text,
} from "react-native";

export default function AppToast({
    visible,
    message,
    type = "success",
    onHide,
}) {

    const translateY = React.useRef(new Animated.Value(100)).current;
    const opacity = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {

        if (!visible) return;

        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {

            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start(() => onHide());

        }, 2500);

        return () => clearTimeout(timer);

    }, [visible]);

    if (!visible) return null;

    const backgroundColor = {
        success: "#16A34A",
        error: "#DC2626",
        warning: "#D97706",
        info: "#2563EB",
    }[type];

    return (

        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor,
                    opacity,
                    transform: [{ translateY }],
                },
            ]}
        >
            <Text style={styles.text}>
                {message}
            </Text>
        </Animated.View>

    );
}

const styles = StyleSheet.create({

    container: {

        position: "absolute",

        left: 20,
        right: 20,
        bottom: 40,

        paddingVertical: 15,
        paddingHorizontal: 18,

        borderRadius: 12,

        elevation: 5,

    },

    text: {

        color: "#FFF",
        fontSize: 15,
        fontWeight: "600",

    },

});