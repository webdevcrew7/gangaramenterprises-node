'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types'
import ProductRow from './ProductRow'
import { useCategory } from '@/contexts/CategoryContext'

interface Category {
  slug: string
  name: string
  icon: string
  image: string | null
}

export default function CollectionsSection() {
  const { selectedCategory, setSelectedCategory } = useCategory()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch products and categories from API
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const filteredProducts =
    selectedCategory === 'sale'
      ? products.filter((p) => p.onSale)
      : products.filter((p) => p.category === selectedCategory)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }



  return (
    <section id="collections" className="py-16 bg-white flex-grow w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">Our Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2">
            Crafted for Your Home
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10" id="category-filters">
          {/* On Sale button - always first */}
          <button
            data-category="sale"
            onClick={() => handleCategoryClick('sale')}
            className={`category-btn flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all group ${selectedCategory === 'sale' ? 'category-active' : ''} sale-flash`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all border-red-400 group-hover:border-red-500 bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-3xl md:text-4xl">🔥</span>
            </div>
            <span className="text-xs md:text-sm text-red-600 group-hover:text-red-700 font-bold">
              On Sale
            </span>
          </button>

          {/* Dynamic categories from database */}
          {categories.map((category) => (
            <button
              key={category.slug}
              data-category={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`category-btn flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all group ${selectedCategory === category.slug ? 'category-active' : ''}`}
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all border-transparent group-hover:border-gold-500 bg-gray-100 flex items-center justify-center ${selectedCategory === category.slug ? 'border-gold-500' : ''}`}
              >
                {category.image ? (
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                ) : (
                  <i className={`fa-solid ${category.icon} text-2xl md:text-3xl text-gray-600`}></i>
                )}
              </div>
              <span
                className={`text-xs md:text-sm ${selectedCategory === category.slug
                  ? 'text-gold-600 font-semibold'
                  : 'text-slate-700 group-hover:text-gold-600 font-medium'
                  }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>

        <div id="product-grid" className="flex flex-col" style={{ gap: '1.25rem' }}>
          {loading ? (
            <div className="flex justify-center py-12">
              <i className="fa-solid fa-spinner fa-spin text-4xl text-gold-500"></i>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductRow key={product.id} product={product} index={index} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <i className="fa-solid fa-box-open text-4xl mb-4"></i>
              <p>No products available in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


