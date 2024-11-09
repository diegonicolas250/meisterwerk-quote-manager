import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useQuotes } from "../context/QuotesContext";
import { Quote } from "../types/quote";
import { generateId } from "../utils/helper";

export const AddQuoteScreen = () => {
  const { addQuote } = useQuotes();

  const handleSave = () => {
    const mockQuote = {
      id: generateId(),
      customer_info: {
        address: "64038 Ibrahim Roads",
        city: "Dundalk",
        country: "Kyrgyz Republic",
        email: "Cody_Kuphal56@hotmail.com",
        name: "Diego",
        phone: "508-625-3723 x55854",
      },
      items: [
        {
          product_name: "Mock Product",
          price: 100,
          quantity: 2,
          subtotal: 200,
        },
      ],
      status: "SENT",
      subtotal: 200,
      total: 220,
      total_tax: 20,
      valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: "Mock description for testing",
    };

    addQuote(mockQuote as Quote);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Quote</Text>
      <Button title="Save Quote" onPress={handleSave} />
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
