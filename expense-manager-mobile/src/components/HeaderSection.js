import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HeaderSection = ({ username }) => {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>
                Hello, {username} 👋
            </Text>

            <Text style={styles.greetingText}>
                {greeting}
            </Text>
        </View>
    );
};

export default HeaderSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 25,
    },

    nameText: {
        fontSize: 28,
        fontWeight: "700",
    },

    greetingText: {
        fontSize: 16,
        color: "#7A7A7A",
        marginTop: 4,
    },
});