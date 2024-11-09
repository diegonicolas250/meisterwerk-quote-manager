import { initQuoteDatabase } from "../database/quotesService";

export const initializeApp = async () => {
  try {
    await initializeDatabases();

    console.log("App initialized successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
    throw new Error("Failed to initialize the app");
  }
};

const initializeDatabases = async () => {
  await initQuoteDatabase();
  // await initProductDatabase ( );
};
