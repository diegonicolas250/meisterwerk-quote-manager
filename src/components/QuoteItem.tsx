import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Quote } from "../types/quote";

interface QuoteItemProps {
  quote: Quote;
}

export const QuoteItem: React.FC<QuoteItemProps> = ({ quote }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user" size={24} color="black" />
        <Text style={styles.customerName}>{quote.customer_info.name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>${quote.total.toFixed(2)}</Text>
      </View>
      <View style={styles.details}>
        <FontAwesome name="calendar" size={20} color="gray" />
        <Text style={styles.date}>
          Valid until: {new Date(quote.valid_until).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  date: {
    color: "gray",
    fontSize: 14,
    marginLeft: 8,
  },
  details: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 4,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
  value: {
    color: "#000",
    fontSize: 16,
  },
});
