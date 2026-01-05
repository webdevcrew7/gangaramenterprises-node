export interface ProductVariant {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'interiors' | 'theatre' | 'furniture' | 'curtains';
  description: string;
  badge?: string;
  onSale?: boolean;
  variants: ProductVariant[];
}

export interface DatabaseProduct {
  id: number;
  name: string;
  category: 'interiors' | 'theatre' | 'furniture' | 'curtains';
  description: string;
  badge?: string;
  on_sale: number;
  is_hidden: number;
  display_order: number;
  image?: string; // First variant image (from subquery)
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseVariant {
  id: number;
  product_id: number;
  name: string;
  image: string;
  color: string;
  display_order: number;
}

export type Category = 'all' | 'sale' | Product['category'];

export interface CartItem extends Product {
  cartItemId: string;
  selectedVariant: ProductVariant;
}

