'use client'

import { useEffect, useState } from 'react'
import { useCategory } from '@/contexts/CategoryContext'

interface Category {
  slug: string
  name: string
  icon: string
  image: string | null
}

export default function MobileCategoryStrip() {
  const { selectedCategory, setSelectedCategory } = useCategory()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const scrollToCategory = (category: string) => {
    // Update the shared state directly
    setSelectedCategory(category)

    // Scroll to the collections section
    const collectionsSection = document.getElementById('collections')
    if (collectionsSection) {
      requestAnimationFrame(() => {
        const headerOffset = 80
        const elementPosition = collectionsSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      })
    }
  }

  return (
    <section className="mobile-category-strip">
      {/* On Sale - always first */}
      <a
        href="#collections"
        className={`category-icon-item sale-icon ${selectedCategory === 'sale' ? 'active' : ''}`}
        data-category="sale"
        onClick={(e) => { e.preventDefault(); scrollToCategory('sale') }}
      >
        <div className={`icon-circle ${selectedCategory === 'sale' ? 'selected' : ''}`}>
          <span style={{ fontSize: '24px' }}>🔥</span>
        </div>
        <span className={selectedCategory === 'sale' ? 'text-gold-600 font-semibold' : ''}>On Sale</span>
      </a>

      {/* Dynamic categories from database */}
      {categories.map((cat) => (
        <a
          key={cat.slug}
          href="#collections"
          className={`category-icon-item ${selectedCategory === cat.slug ? 'active' : ''}`}
          data-category={cat.slug}
          onClick={(e) => { e.preventDefault(); scrollToCategory(cat.slug) }}
        >
          <div className={`icon-circle ${selectedCategory === cat.slug ? 'selected' : ''}`}>
            {cat.image ? (
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              <i className={`fa-solid ${cat.icon}`} style={{ fontSize: '20px' }}></i>
            )}
          </div>
          <span className={selectedCategory === cat.slug ? 'text-gold-600 font-semibold' : ''}>{cat.name}</span>
        </a>
      ))}
    </section>
  )
}
