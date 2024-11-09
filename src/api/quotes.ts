import axios from "axios";
import { Quote } from "../types/quote";

const API_URL = "http://10.0.2.2:8090/api/collections/quotes/records";

export const getQuotes = async (
  page: number,
  perPage: number,
): Promise<Quote[]> => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { page, perPage },
    });
    return response.data.items as Quote[];
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    throw error;
  }
};

export const createQuote = async (newQuote: Quote): Promise<Quote> => {
  try {
    console.log("Creating new quote:", newQuote);
    const response = await axios.post(`${API_URL}`, newQuote);
    console.log("Quote created successfully:", response);
    return response.data as Quote;
  } catch (error) {
    console.error("Failed to create quote:", error);
    throw error;
  }
};

export const getQuoteById = async (id: string): Promise<Quote> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data as Quote;
  } catch (error) {
    console.error(`Failed to fetch quote with ID ${id}:`, error);
    throw error;
  }
};

export const updateQuote = async (
  id: string,
  updatedData: Partial<Quote>,
): Promise<Quote> => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
    return response.data as Quote;
  } catch (error) {
    console.error(`Failed to update quote with ID ${id}:`, error);
    throw error;
  }
};

export const deleteQuote = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Quote with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete quote with ID ${id}:`, error);
    throw error;
  }
};
