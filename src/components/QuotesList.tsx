import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { QuoteItem } from "./QuoteItem";
import { useQuotes } from "../context/QuotesContext";

const PAGE = 1;
const PER_PAGE = 120;

export const QuotesList = () => {
  const { quotes, quotesLoading, quotesError, loadQuotes } = useQuotes();

  useEffect(() => {
    loadQuotes(PAGE, PER_PAGE);
  }, []);

  if (quotesLoading) {
    return <Loading />;
  }

  if (quotesError) {
    return <Error />;
  }

  const emptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No quotes available to display.</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuoteItem quote={item} />}
        ListEmptyComponent={emptyListComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: "#888",
    fontSize: 18,
    textAlign: "center",
  },
});
