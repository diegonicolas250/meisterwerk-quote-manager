import React from "react";
import { QuotesFiltersScreen } from "../screens/QuotesFiltersScreen";
import { AddQuoteScreen } from "../screens/AddQuoteScreen";
import { QuotesStackParamList } from "./types";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createStackNavigator<QuotesStackParamList>();

export const QuotesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Quote" }}
      />
      <Stack.Screen
        name="QuotesFilters"
        component={QuotesFiltersScreen}
        options={{ title: "Filter Quote" }}
      />
      <Stack.Screen
        name="AddQuote"
        component={AddQuoteScreen}
        options={{ title: "Add Quote" }}
      />
    </Stack.Navigator>
  );
};
