import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Quote } from "../types/quote";
import { createQuote, getQuotes } from "../api/quotes";
import {
  fetchQuotesFromSQLite,
  fetchUnsyncedQuotes,
  markQuoteAsSynced,
  saveQuotesToSQLite,
} from "../database/quotesService";
import NetInfo from "@react-native-community/netinfo";

interface QuotesContextType {
  quotes: Quote[];
  quotesLoading: boolean;
  quotesError: boolean;
  loadQuotes: (page: number, perPage: number) => void;
  addQuote: (quote: Quote) => void;
  addUnsyncedQuotes: () => void;
  unsyncedQuotes: Quote[];
}

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

interface QuotesProviderProps {
  children: ReactNode;
}

export const QuotesProvider: React.FC<QuotesProviderProps> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [unsyncedQuotes, setUnsyncedQuotes] = useState<Quote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState<boolean>(false);
  const [quotesError, setQuotesError] = useState<boolean>(false);

  useEffect(() => {
    loadUnsyncedQuotes();
  }, []);

  const loadQuotes = async (page: number, perPage: number) => {
    try {
      setQuotesLoading(true);

      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        const savedData = await fetchQuotesFromSQLite();
        setQuotes(savedData);
        return;
      }

      const data = await getQuotes(page, perPage);
      await saveQuotesToSQLite(data);
      setQuotes(data);
    } catch (error) {
      setQuotesError(true);
    } finally {
      setQuotesLoading(false);
    }
  };

  const addQuote = async (quote: Quote) => {
    try {
      const netInfo = await NetInfo.fetch();

      if (netInfo.isConnected) {
        await createQuote(quote);
        await saveQuotesToSQLite([{ ...quote, isSynced: 1 }]);
        // TODO: Show success toast for online addition
      } else {
        await saveQuotesToSQLite([{ ...quote, isSynced: 0 }]);
        setUnsyncedQuotes((prev) => [{ ...quote, isSynced: 0 }, ...prev]);
        // TODO: Show toast for offline addition
      }

      setQuotes((prevQuotes) => [
        { ...quote, isSynced: netInfo.isConnected ? 1 : 0 },
        ...prevQuotes,
      ]);
    } catch (error) {
      // TODO: Show error toast
      console.error("Failed to add quote:", error);
    }
  };

  const loadUnsyncedQuotes = async () => {
    const unsyncedData = await fetchUnsyncedQuotes();
    console.log("loading unsync quotes...", unsyncedData.length);

    setUnsyncedQuotes(unsyncedData);
  };

  const addUnsyncedQuotes = async () => {
    const netInfo = await NetInfo.fetch();

    if (!netInfo.isConnected) {
      // TODO: Show toast for no connection error, Cannot sync quotes at this time.
      console.log("No internet connection. Cannot sync quotes.");
      return;
    }

    let failedSyncCount = 0;

    for (const quote of unsyncedQuotes) {
      try {
        await createQuote(quote);
        await markQuoteAsSynced(quote.id);
        setUnsyncedQuotes((prev) =>
          prev.filter((unsyncedQuote) => unsyncedQuote.id !== quote.id),
        );
        console.log(`Quote ${quote.id} synced successfully.`);
      } catch (error) {
        failedSyncCount++;
        console.error(`Failed to sync quote ${quote.id}:`, error);
      }
    }

    if (failedSyncCount === 0) {
      // TODO: Show success toast
    } else {
      // TODO: Show error toast
    }
  };

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        quotesLoading,
        quotesError,
        loadQuotes,
        addQuote,
        unsyncedQuotes,
        addUnsyncedQuotes,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotes = (): QuotesContextType => {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
};
