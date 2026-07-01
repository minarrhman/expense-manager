import React from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

export default function DateRangeFilterModal({
    visible,
    onClose,
    onSelect,
    selectedRange,
    colors,
}) {

    const options = [
        { label: "This Month", value: "this_month" },
        { label: "Last Month", value: "last_month" },
        { label: "Last 3 Months", value: "3m" },
        { label: "Last 6 Months", value: "6m" },
        { label: "This Year", value: "year" },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            {/* backdrop */}
            <Pressable
                style={styles.backdrop}
                onPress={onClose}
            />

            {/* bottom sheet */}
            <View style={[styles.container, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Select Date Range
                </Text>

                {options.map((item) => (
                    <Pressable
                        key={item.value}
                        onPress={() => onSelect(item.value)}
                        style={[
                            styles.option,
                            selectedRange === item.value && {
                                backgroundColor: colors.primary + "20",
                            },
                        ]}
                    >
                        <Text style={{ color: colors.text }}>
                            {item.label}
                        </Text>
                    </Pressable>
                ))}

                <Pressable onPress={onClose} style={styles.close}>
                    <Text style={{ color: "red" }}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },

    option: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
    },

    close: {
        marginTop: 10,
        alignItems: "center",
    },
});