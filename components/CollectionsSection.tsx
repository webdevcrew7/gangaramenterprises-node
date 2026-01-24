'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
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
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Check scroll position to show/hide arrows
  const checkScrollPosition = useCallback(() => {
    const container = carouselRef.current
    if (!container) return
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1)
  }, [])

  // Scroll handlers for arrows
  const scrollLeft = () => {
    const container = carouselRef.current
    if (!container) return
    container.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const container = carouselRef.current
    if (!container) return
    container.scrollBy({ left: 200, behavior: 'smooth' })
  }

  // Fetch products and categories from API
  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  // Update scroll state when categories load or window resizes
  useEffect(() => {
    checkScrollPosition()
    window.addEventListener('resize', checkScrollPosition)
    return () => window.removeEventListener('resize', checkScrollPosition)
  }, [categories, checkScrollPosition])

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

  // Sort products by variant count (descending) - more variants first to avoid white spaces
  const sortByVariants = (productList: Product[]) =>
    [...productList].sort((a, b) => (b.variants?.length || 0) - (a.variants?.length || 0))

  const filteredProducts =
    selectedCategory === 'sale'
      ? sortByVariants(products) // Show ALL products sorted by variants
      : sortByVariants(products.filter((p) => p.category === selectedCategory))

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <section id="collections" className="py-16 bg-white flex-grow w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">Our Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2">
            Crafted for Your Home
          </h2>
        </div>

        {/* MOBILE: Categories in continuous rows (flex-wrap) */}
        <div className="flex md:hidden flex-wrap justify-center gap-2 mb-10 px-2" id="category-filters-mobile">
          {/* On Sale button */}
          <button
            data-category="sale"
            onClick={() => handleCategoryClick('sale')}
            className={`category-btn flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-all group ${selectedCategory === 'sale' ? 'category-active' : ''} sale-flash`}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 transition-all border-red-400 group-hover:border-red-500 bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <span className="text-[10px] text-red-600 group-hover:text-red-700 font-bold whitespace-nowrap">
              On Sale
            </span>
          </button>

          {/* Dynamic categories */}
          {categories.map((category) => (
            <button
              key={category.slug}
              data-category={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`category-btn flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-all group ${selectedCategory === category.slug ? 'category-active' : ''}`}
            >
              <div
                className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all border-transparent group-hover:border-gold-500 bg-gray-100 flex items-center justify-center ${selectedCategory === category.slug ? 'border-gold-500' : ''}`}
              >
                {category.image ? (
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                ) : (
                  <i className={`fa-solid ${category.icon} text-xl text-gray-600`}></i>
                )}
              </div>
              <span
                className={`text-[10px] whitespace-nowrap ${selectedCategory === category.slug
                  ? 'text-gold-600 font-semibold'
                  : 'text-slate-700 group-hover:text-gold-600 font-medium'
                  }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* DESKTOP/TABLET: Fixed On Sale + scrollable carousel with arrows */}
        <div className="hidden md:flex items-start gap-2 mb-10" id="category-filters">
          {/* On Sale button - always fixed/visible */}
          <div className="flex-shrink-0">
            <button
              data-category="sale"
              onClick={() => handleCategoryClick('sale')}
              className={`category-btn flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all group ${selectedCategory === 'sale' ? 'category-active' : ''} sale-flash`}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 transition-all border-red-400 group-hover:border-red-500 bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-4xl">🔥</span>
              </div>
              <span className="text-sm text-red-600 group-hover:text-red-700 font-bold whitespace-nowrap">
                On Sale
              </span>
            </button>
          </div>

          {/* Divider line */}
          <div className="flex-shrink-0 w-px h-24 bg-gray-200 self-center"></div>

          {/* Scrollable categories carousel with arrows */}
          <div className="relative flex-1 min-w-0">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:scale-110 transition-all duration-200 border border-gray-200 group/arrow"
                aria-label="Scroll left"
              >
                <i className="fa-solid fa-chevron-left text-gray-600 group-hover/arrow:text-white text-sm"></i>
              </button>
            )}

            {/* Categories container */}
            <div
              ref={carouselRef}
              onScroll={checkScrollPosition}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category.slug}
                  data-category={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`category-btn flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all group flex-shrink-0 ${selectedCategory === category.slug ? 'category-active' : ''}`}
                >
                  <div
                    className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all border-transparent group-hover:border-gold-500 bg-gray-100 flex items-center justify-center ${selectedCategory === category.slug ? 'border-gold-500' : ''}`}
                  >
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    ) : (
                      <i className={`fa-solid ${category.icon} text-3xl text-gray-600`}></i>
                    )}
                  </div>
                  <span
                    className={`text-sm whitespace-nowrap ${selectedCategory === category.slug
                      ? 'text-gold-600 font-semibold'
                      : 'text-slate-700 group-hover:text-gold-600 font-medium'
                      }`}
                  >
                    {category.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:scale-110 transition-all duration-200 border border-gray-200 group/arrow"
                aria-label="Scroll right"
              >
                <i className="fa-solid fa-chevron-right text-gray-600 group-hover/arrow:text-white text-sm"></i>
              </button>
            )}
          </div>
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


