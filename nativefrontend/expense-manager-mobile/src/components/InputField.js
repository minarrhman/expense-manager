import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField({
  label,
  error,
  ...props
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={ label}
        {...props}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});