import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { QuotesStackParamList } from "../navigation/types";
import { StackScreenProps } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { QuotesList } from "../components/QuotesList";
import { UnsyncedQuotes } from "../components/UnsyncedQuotes";

type HomeScreenProps = StackScreenProps<QuotesStackParamList, "Home">;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          onPress={() => navigation.navigate("AddQuote")}
          style={{ marginRight: 16 }}
          name="pluscircleo"
          size={24}
          color="black"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <UnsyncedQuotes />
      <Text
        style={{
          marginBottom: 20,
          fontSize: 18,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        List of quotes
      </Text>

      <QuotesList />
    </View>
  );
};
