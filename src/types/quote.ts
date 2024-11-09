export interface QuoteItem {
  price: number;
  product_name: string;
  quantity: number;
  subtotal: number;
}

export interface CustomerInfo {
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  phone: string;
}

export interface Quote {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  customer_info: CustomerInfo;
  description: string;
  items: QuoteItem[];
  status: string;
  subtotal: number;
  total: number;
  total_tax: number;
  updated: string;
  valid_until: string;
  isSynced?: number;
}
