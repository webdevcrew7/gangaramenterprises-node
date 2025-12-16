'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { getCategoryName } from '@/utils/category';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-premium transition-all duration-500 border border-gray-200/50 overflow-hidden fade-in-up premium-hover">
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {product.badge && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wide rounded-full z-10 shadow-lg animate-pulse-slow">
            {product.badge}
          </span>
        )}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-115 transition-transform duration-[800ms] ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="text-center p-6">
              <i className="fa-solid fa-image text-4xl text-gray-400 mb-3"></i>
              <p className="text-xs text-gray-500 font-medium">Image Coming Soon</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <button
          onClick={() => onAddToCart(product)}
          className="add-to-cart-btn absolute bottom-5 right-5 bg-gradient-to-r from-black to-gray-900 text-gold-400 w-12 h-12 rounded-full shadow-premium flex items-center justify-center transform translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-600 hover:text-black z-20 border-2 border-white/20"
          aria-label="Add to inquiry"
        >
          <i className="fa-solid fa-plus text-lg transition-transform duration-300 group-hover:rotate-90"></i>
        </button>
      </div>
      <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
        <p className="text-xs text-gold-600 uppercase tracking-widest mb-2 font-semibold">
          {getCategoryName(product.category)}
        </p>
        <h3 className="font-serif font-bold text-xl text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-gold-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem] leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-gold-600 font-bold text-sm flex items-center gap-2 group-hover:text-gold-700 transition-colors duration-300">
            <i className="fa-solid fa-quote-left text-xs"></i>
            Request Quote
          </span>
          <i className="fa-solid fa-arrow-right text-gold-500 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300"></i>
        </div>
      </div>
    </div>
  );
}

