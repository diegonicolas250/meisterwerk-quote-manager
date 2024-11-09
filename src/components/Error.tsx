import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Error = () => (
  <View style={styles.container}>
    <Text style={styles.errorText}>An error has occurred</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
