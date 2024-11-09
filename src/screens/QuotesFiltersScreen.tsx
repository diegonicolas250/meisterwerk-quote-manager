import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const QuotesFiltersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO Filter Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});
