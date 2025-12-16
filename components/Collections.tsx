'use client';

import { useState, useEffect } from 'react';
import { Category, Product } from '@/types';
import { useProductFilter } from '@/hooks/useProductFilter';
import { useCartContext } from './CartProvider';
import { useToast } from '@/hooks/useToast';
import ProductCard from './ProductCard';

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategory, setSelectedCategory, filteredProducts } =
    useProductFilter(products);
  const { addToCart } = useCartContext();
  const { showToast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const categories: { value: Category; label: string }[] = [
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
    <section id="collections" className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white flex-grow w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-gold-500 font-semibold tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block">
            Our Portfolio
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-black mt-4 mb-4 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Crafted for Your Home
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-6 md:px-8 py-3 rounded-full border-2 text-xs md:text-sm font-semibold transition-all duration-500 transform hover:scale-105 ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-black to-gray-900 text-gold-400 border-gold-500 shadow-premium scale-105'
                  : 'text-slate-700 border-gray-300 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50/50'
              }`}
            >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
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
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

