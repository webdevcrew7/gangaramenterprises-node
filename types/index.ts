export interface Product {
  id: number;
  name: string;
  category: 'interiors' | 'theatre' | 'furniture' | 'decor';
  description: string;
  image: string;
  badge?: string;
}

export interface DatabaseProduct extends Product {
  is_hidden: number; // 0 or 1 in database
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type Category = 'all' | Product['category'];

export interface CartItem extends Product {}

