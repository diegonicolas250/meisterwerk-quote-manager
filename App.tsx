import React, { useEffect, useState } from "react";
import { QuotesProvider } from "./src/context/QuotesContext";
import { initializeApp } from "./src/config/appInitializer";
import { NavigationContainer } from "@react-navigation/native";
import { QuotesStack } from "./src/navigation/QuotesStack";
import { Loading } from "./src/components/Loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeApp();
        setLoading(false);
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <QuotesProvider>
      <NavigationContainer>
        <QuotesStack />
      </NavigationContainer>
    </QuotesProvider>
  );
}
