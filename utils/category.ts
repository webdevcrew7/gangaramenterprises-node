import { Product } from '@/types';

export function getCategoryName(category: Product['category']): string {
  const map: Record<Product['category'], string> = {
    interiors: 'Interiors & Kitchens',
    theatre: 'Home Theatre',
    furniture: 'Furniture',
    curtains: 'Curtains & Blinds',
  };
  return map[category] || category;
}

