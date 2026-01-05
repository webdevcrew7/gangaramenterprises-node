'use client'

import Image from 'next/image'
import { useCategory } from '@/contexts/CategoryContext'

export default function MobileCategoryStrip() {
  const { selectedCategory, setSelectedCategory } = useCategory()

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

  const categories = [
    { key: 'sale', label: 'On Sale', icon: '🔥', isSale: true },
    { key: 'interiors', label: 'Interiors', image: '/assets/Interiors/Design1.webp' },
    { key: 'theatre', label: 'Theatre', image: '/assets/Home Theatre/HT1.webp' },
    { key: 'furniture', label: 'Furniture', image: '/assets/Furniture/sofa1.webp' },
    { key: 'curtains', label: 'Curtains', image: '/assets/Curtains/Curtain1.webp' },
  ]

  return (
    <section className="mobile-category-strip">
      {categories.map((cat) => (
        <a
          key={cat.key}
          href="#collections"
          className={`category-icon-item ${cat.isSale ? 'sale-icon' : ''} ${selectedCategory === cat.key ? 'active' : ''}`}
          data-category={cat.key}
          onClick={(e) => { e.preventDefault(); scrollToCategory(cat.key) }}
        >
          <div className={`icon-circle ${selectedCategory === cat.key ? 'selected' : ''}`}>
            {cat.icon ? (
              <span style={{ fontSize: '24px' }}>{cat.icon}</span>
            ) : (
              <Image src={cat.image!} alt={cat.label} width={52} height={52} className="w-full h-full object-cover" unoptimized />
            )}
          </div>
          <span className={selectedCategory === cat.key ? 'text-gold-600 font-semibold' : ''}>{cat.label}</span>
        </a>
      ))}
    </section>
  )
}
