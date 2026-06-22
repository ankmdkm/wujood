export type Store = {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  whatsapp_number: string | null;
  logo_url: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export type Category = {
  id: string;
  store_id: string;
  name: string;
  created_at: string;
};

export type Product = {
  id: string;
  store_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  cost_price: number | null;
  stock_quantity: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type Customer = {
  id: string;
  store_id: string;
  name: string;
  phone: string;
  city: string | null;
  address: string | null;
  created_at: string;
};

export type OrderStatus = "new" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  store_id: string;
  customer_id: string;
  status: OrderStatus;
  total_amount: number;
  notes: string | null;
  created_at: string;
  customers?: Customer;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  products?: Product;
};
