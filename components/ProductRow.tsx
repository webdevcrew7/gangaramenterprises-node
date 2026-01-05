'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Product } from '@/types'
import { getCategoryName } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'
import { showToast } from './Toast'
import ProductModal from './ProductModal'

interface ProductRowProps {
  product: Product
  index?: number
}

export default function ProductRow({ product, index = 0 }: ProductRowProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [showPrevBtn, setShowPrevBtn] = useState(false)
  const [showNextBtn, setShowNextBtn] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const isDownRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const { addToCart } = useCart()

  // Update navigation button visibility
  const updateNavButtons = () => {
    if (!trackRef.current) return
    const scrollLeft = trackRef.current.scrollLeft
    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth

    setShowPrevBtn(scrollLeft > 10)
    setShowNextBtn(scrollLeft < maxScroll - 10)
  }

  // Initialize drag/touch support
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Scroll event listener
    track.addEventListener('scroll', updateNavButtons)
    updateNavButtons()

    // Mouse drag support
    const handleMouseDown = (e: MouseEvent) => {
      isDownRef.current = true
      track.classList.add('grabbing')
      startXRef.current = e.pageX - track.offsetLeft
      scrollLeftRef.current = track.scrollLeft
    }

    const handleMouseLeave = () => {
      isDownRef.current = false
      track.classList.remove('grabbing')
    }

    const handleMouseUp = () => {
      isDownRef.current = false
      track.classList.remove('grabbing')
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      const walk = (x - startXRef.current) * 1.5
      track.scrollLeft = scrollLeftRef.current - walk
    }

    // Touch support
    let touchStartX = 0
    let touchScrollLeft = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX - track.offsetLeft
      touchScrollLeft = track.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - track.offsetLeft
      const walk = (x - touchStartX) * 1.5
      track.scrollLeft = touchScrollLeft - walk
    }

    track.addEventListener('mousedown', handleMouseDown)
    track.addEventListener('mouseleave', handleMouseLeave)
    track.addEventListener('mouseup', handleMouseUp)
    track.addEventListener('mousemove', handleMouseMove)
    track.addEventListener('touchstart', handleTouchStart, { passive: true })
    track.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      track.removeEventListener('scroll', updateNavButtons)
      track.removeEventListener('mousedown', handleMouseDown)
      track.removeEventListener('mouseleave', handleMouseLeave)
      track.removeEventListener('mouseup', handleMouseUp)
      track.removeEventListener('mousemove', handleMouseMove)
      track.removeEventListener('touchstart', handleTouchStart)
      track.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const scrollVariant = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.querySelector('.variant-card')?.clientWidth || 200
      trackRef.current.scrollBy({
        left: direction === 'right' ? cardWidth + 16 : -(cardWidth + 16),
        behavior: 'smooth',
      })
    }
  }

  const openProductModal = (variantId: string) => {
    setSelectedVariantId(variantId)
    setModalOpen(true)
  }

  const handleAddToCart = (e: React.MouseEvent, variantId: string) => {
    e.stopPropagation()
    addToCart(product, variantId)
    const variant = product.variants.find(v => v.id === variantId)
    showToast(`Added ${product.name}${variant ? ` - ${variant.name}` : ''} to list`)
  }

  const handleSwatchClick = (index: number) => {
    setActiveVariantIndex(index)
    if (trackRef.current) {
      const card = trackRef.current.children[index] as HTMLElement
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        // Update active card class
        Array.from(trackRef.current.children).forEach((c, i) => {
          c.classList.toggle('active', i === index)
        })
      }
    }
  }

  return (
    <div
      className="product-row fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="product-row-header">
        <div className="product-row-title-wrap">
          {product.badge && (
            <span className={`product-row-badge ${product.onSale ? 'sale-badge' : ''}`}>
              {product.badge}
            </span>
          )}
          <h3 className="product-row-title">{product.name}</h3>
          <p className="product-row-desc hidden md:block">{product.description}</p>
        </div>
        <span className="product-row-category">{getCategoryName(product.category)}</span>
      </div>
      <div className="variant-carousel" data-product-id={product.id}>
        <div ref={trackRef} className="variant-track">
          {(product.variants.length > 0 ? product.variants : [
            // Placeholder variant when no images exist
            { id: `placeholder-${product.id}`, name: 'Add images in admin', image: '/assets/placeholder.svg', color: '#cccccc' }
          ]).map((variant, idx) => (
            <div
              key={variant.id}
              className={`variant-card ${idx === activeVariantIndex ? 'active' : ''}`}
              data-variant-id={variant.id}
              onClick={() => product.variants.length > 0 ? openProductModal(variant.id) : null}
            >
              <div className="variant-image-wrap">
                <Image
                  src={variant.image}
                  alt={variant.name}
                  width={220}
                  height={220}
                  className="variant-image"
                  loading="lazy"
                  unoptimized
                />
                {product.variants.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-400 p-4">
                      <i className="fa-solid fa-image text-4xl mb-2"></i>
                      <p className="text-xs">No images yet</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => handleAddToCart(e, variant.id)}
                  className="variant-add-btn"
                  aria-label="Add to inquiry"
                  style={{ display: 'none' }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="variant-info">
                <span className="variant-name">{variant.name}</span>
                <span
                  className="variant-color"
                  style={{ backgroundColor: variant.color }}
                ></span>
              </div>
            </div>
          ))}
        </div>
        {product.variants.length > 1 && (
          <>
            <button
              ref={prevBtnRef}
              className={`carousel-nav carousel-nav-prev hidden md:flex ${!showPrevBtn ? 'hidden' : ''}`}
              onClick={() => scrollVariant('left')}
              aria-label="Previous variant"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              ref={nextBtnRef}
              className={`carousel-nav carousel-nav-next hidden md:flex ${!showNextBtn ? 'hidden' : ''}`}
              onClick={() => scrollVariant('right')}
              aria-label="Next variant"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}
      </div>
      {product.variants.length > 1 && (
        <div className="variant-swatches">
          {product.variants.slice(0, 4).map((variant, idx) => (
            <button
              key={variant.id}
              className={`variant-swatch ${idx === activeVariantIndex ? 'active' : ''}`}
              onClick={() => handleSwatchClick(idx)}
              style={{ backgroundColor: variant.color }}
              title={variant.name}
            />
          ))}
          {product.variants.length > 4 && (
            <span className="more-variants">+{product.variants.length - 4}</span>
          )}
        </div>
      )}
      <ProductModal
        product={modalOpen ? product : null}
        variantId={selectedVariantId}
        onClose={() => {
          setModalOpen(false)
          setSelectedVariantId(null)
        }}
      />
    </div>
  )
}

