import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuotes } from "../context/QuotesContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";

export const UnsyncedQuotes = () => {
  const { unsyncedQuotes, addUnsyncedQuotes } = useQuotes();

  if (unsyncedQuotes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>All done! Everything is up-to-date.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quotes to Sync: {unsyncedQuotes.length}</Text>

      <TouchableOpacity
        onPress={addUnsyncedQuotes}
        style={styles.syncContainer}
      >
        <AntDesign name="sync" size={20} color="black" />
        <Text style={{ marginLeft: 10 }}>SYNC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e1d992",
    borderRadius: 15,
    flexDirection: "row",
    height: 70,
    justifyContent: "center",
    paddingVertical: 15,
  },
  syncContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: 20,
    padding: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
