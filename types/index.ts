export interface Product {
  id: number;
  name: string;
  category: 'interiors' | 'theatre' | 'furniture' | 'decor';
  description: string;
  image: string;
  badge?: string;
  onSale?: boolean;
}

export interface DatabaseProduct extends Product {
  is_hidden: number; // 0 or 1 in database
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type Category = 'all' | 'sale' | Product['category'];

export interface CartItem extends Product { }

