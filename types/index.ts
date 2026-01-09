export interface ProductVariant {
  id: string;
  name: string;
  image: string;      // Primary image (first image / thumbnail)
  images: string[];   // All images for this variant
  color: string;
}

export interface Product {
  id: number;
  name: string;
  category: string; // Dynamic category slug
  description: string;
  badge?: string;
  onSale?: boolean;
  variants: ProductVariant[];
}

export interface DatabaseProduct {
  id: number;
  name: string;
  category: string; // Dynamic category slug
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

export interface DatabaseVariantImage {
  id: number;
  variant_id: number;
  image_url: string;
  display_order: number;
}

export interface DatabaseCategory {
  id: number;
  slug: string;
  name: string;
  icon: string;
  display_order: number;
  is_active: number;
  created_at?: string;
}

export type Category = 'all' | 'sale' | string;

export interface CartItem extends Product {
  cartItemId: string;
  selectedVariant: ProductVariant;
}
