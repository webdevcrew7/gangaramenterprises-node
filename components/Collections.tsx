'use client';

import { useState, useEffect } from 'react';
import { Category, Product } from '@/types';
import { useProductFilter } from '@/hooks/useProductFilter';
import { useCartContext } from './CartProvider';
import { useToastContext } from './ToastProvider';
import ProductCard from './ProductCard';

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategory, setSelectedCategory, filteredProducts } =
    useProductFilter(products);
  const { addToCart } = useCartContext();
  const { showToast } = useToastContext();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Listen for category selection from mobile strip
  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent<{ category: string }>) => {
      const category = event.detail.category as Category;
      setSelectedCategory(category);
    };

    window.addEventListener('categorySelected', handleCategorySelected as EventListener);
    return () => {
      window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
    };
  }, [setSelectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories: { value: Category; label: string; emoji?: string; isSale?: boolean }[] = [
    { value: 'sale', label: 'On Sale', emoji: '🔥', isSale: true },
    { value: 'all', label: 'All' },
    { value: 'interiors', label: 'Interiors' },
    { value: 'theatre', label: 'Home Theatre' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'decor', label: 'Decor' },
  ];

  const handleAddToCart = (product: Product) => {
    const wasInCart = addToCart(product);
    if (wasInCart) {
      showToast('Already in list');
    } else {
      showToast(`Added ${product.name} to list`);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <section id="collections" className="py-16 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white flex-grow w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-gold-600 font-semibold tracking-[0.2em] text-xs md:text-sm uppercase mb-3 block">
            Our Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-2">
            Crafted for Your Home
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Category Filters - Desktop (Icon-based Flipkart style) */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 md:gap-6 mb-12" id="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.value}
              data-category={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-300 ${cat.isSale ? 'sale-flash' : ''
                } ${selectedCategory === cat.value
                  ? 'scale-105'
                  : 'hover:scale-105'
                }`}
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all duration-300 ${cat.isSale
                  ? 'border-red-400 bg-gradient-to-br from-red-500 to-orange-500'
                  : selectedCategory === cat.value
                    ? 'border-gold-500 bg-royal-700'
                    : 'border-gray-200 bg-gray-100 hover:border-gold-400'
                  }`}
              >
                {cat.emoji ? (
                  <span className="text-3xl md:text-4xl">{cat.emoji}</span>
                ) : (
                  <span
                    className={`text-lg font-bold ${selectedCategory === cat.value ? 'text-gold-400' : 'text-gray-500'
                      }`}
                  >
                    {cat.label.charAt(0)}
                  </span>
                )}
              </div>
              <span
                className={`text-xs md:text-sm font-medium transition-colors duration-300 ${cat.isSale
                  ? 'text-red-600 font-bold'
                  : selectedCategory === cat.value
                    ? 'text-gold-600 font-bold'
                    : 'text-slate-700'
                  }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Category Filters - Simple buttons */}
        <div className="md:hidden flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-300 ${selectedCategory === cat.value
                ? 'bg-royal-700 text-gold-400 border-gold-500'
                : 'bg-white text-slate-700 border-gray-300 hover:border-gold-400'
                } ${cat.isSale ? 'animate-pulse border-red-400 text-red-500' : ''}`}
            >
              {cat.emoji && <span className="mr-1">{cat.emoji}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-gold-500"></i>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="fade-in-up"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <i className="fa-solid fa-box-open text-5xl mb-4 text-gray-300"></i>
            <p>No products available in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
