'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/types';

export function useProductFilter(products: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    if (selectedCategory === 'sale') {
      return products.filter((p) => p.onSale === true);
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  };
}

