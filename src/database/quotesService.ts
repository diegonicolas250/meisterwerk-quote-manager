import * as SQLite from "expo-sqlite";
import { Quote, CustomerInfo, QuoteItem } from "../types/quote";

let db: SQLite.SQLiteDatabase;

export const initQuoteDatabase = async () => {
  db = await SQLite.openDatabaseAsync("quotes7.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      status TEXT,
      subtotal REAL,
      total REAL,
      total_tax REAL,
      created TEXT,
      updated TEXT,
      valid_until TEXT,
      isSynced BOOLEAN DEFAULT 1
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS customers (
      quote_id TEXT,
      name TEXT,
      address TEXT,
      city TEXT,
      country TEXT,
      email TEXT,
      phone TEXT,
      FOREIGN KEY(quote_id) REFERENCES quotes(id)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS quote_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote_id TEXT,
      product_name TEXT,
      price REAL,
      quantity INTEGER,
      subtotal REAL,
      FOREIGN KEY(quote_id) REFERENCES quotes(id)
    );
  `);
};

export const saveQuotesToSQLite = async (quotes: Quote[]): Promise<void> => {
  try {
    for (const quote of quotes) {
      const {
        id,
        customer_info,
        status,
        subtotal,
        total,
        total_tax,
        created,
        updated,
        valid_until,
        items,
        isSynced = 1,
      } = quote;

      await db.runAsync(
        "INSERT OR REPLACE INTO quotes (id, status, subtotal, total, total_tax, created, updated, valid_until, isSynced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        id,
        status,
        subtotal,
        total,
        total_tax,
        created,
        updated,
        valid_until,
        isSynced,
      );

      await db.runAsync("DELETE FROM customers WHERE quote_id = ?", id);

      await db.runAsync(
        "INSERT INTO customers (quote_id, name, address, city, country, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
        id,
        customer_info.name,
        customer_info.address,
        customer_info.city,
        customer_info.country,
        customer_info.email,
        customer_info.phone,
      );

      await db.runAsync("DELETE FROM quote_items WHERE quote_id = ?", id);

      for (const item of items) {
        await db.runAsync(
          "INSERT INTO quote_items (quote_id, product_name, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?)",
          id,
          item.product_name,
          item.price,
          item.quantity,
          item.subtotal,
        );
      }
    }
  } catch (error) {
    console.error("Failed to save quotes to SQLite", error);
    throw new Error("Failed to save quotes to SQLite");
  }
};

export const fetchQuotesFromSQLite = async (): Promise<Quote[]> => {
  try {
    const quotes = await db.getAllAsync("SELECT * FROM quotes");

    const result = [];

    for (const row of quotes) {
      const customer = await db.getAllAsync(
        "SELECT * FROM customers WHERE quote_id = ?",
        row.id,
      );

      const items = await db.getAllAsync(
        "SELECT * FROM quote_items WHERE quote_id = ?",
        row.id,
      );

      result.push({
        id: row.id,
        status: row.status,
        subtotal: row.subtotal,
        total: row.total,
        total_tax: row.total_tax,
        created: row.created,
        updated: row.updated,
        valid_until: row.valid_until,
        customer_info: customer[0] as CustomerInfo,
        items: items.map((item) => ({
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })) as QuoteItem[],
      });
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch quotes from SQLite", error);
    throw new Error("Failed to fetch quotes from SQLite");
  }
};

export const fetchUnsyncedQuotes = async (): Promise<Quote[]> => {
  try {
    const quotes = await db.getAllAsync(
      "SELECT * FROM quotes WHERE isSynced = 0",
    );

    const result: Quote[] = [];

    for (const row of quotes) {
      const customer = await db.getAllAsync(
        "SELECT * FROM customers WHERE quote_id = ?",
        row.id,
      );

      const items = await db.getAllAsync(
        "SELECT * FROM quote_items WHERE quote_id = ?",
        row.id,
      );

      result.push({
        collectionId: "",
        collectionName: "",
        description: "",
        id: row.id,
        status: row.status,
        subtotal: row.subtotal,
        total: row.total,
        total_tax: row.total_tax,
        created: row.created,
        updated: row.updated,
        valid_until: row.valid_until,
        isSynced: row.isSynced,
        customer_info: customer[0] as CustomerInfo,
        items: items.map((item) => ({
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })) as QuoteItem[],
      });
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch unsynced quotes from SQLite", error);
    throw new Error("Failed to fetch unsynced quotes from SQLite");
  }
};

export const markQuoteAsSynced = async (quoteId: string): Promise<void> => {
  try {
    await db.runAsync("UPDATE quotes SET isSynced = 1 WHERE id = ?", quoteId);
  } catch (error) {
    console.error("Failed to mark quote as synced", error);
    throw new Error("Failed to mark quote as synced");
  }
};
