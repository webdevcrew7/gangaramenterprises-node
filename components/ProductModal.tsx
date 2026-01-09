'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Product, ProductVariant } from '@/types'
import { getCategoryName } from '@/lib/products'
import Image from 'next/image'

interface ProductModalProps {
  product: Product | null
  variantId: string | null
  onClose: () => void
}

export default function ProductModal({ product, variantId, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Find the selected variant
  const variant = product?.variants.find(v => v.id === variantId) || product?.variants[0]

  // Use the real images array from the variant (includes primary + additional images)
  const variantImages = variant?.images || (variant ? [variant.image] : [])

  // Reset image index when variant changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [variantId])

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft') navigateImages(-1)
        if (e.key === 'ArrowRight') navigateImages(1)
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [product, onClose])

  // Mount state for portal - ensures we only render after component mounts (client-side)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!product || !mounted || !variant) return null

  const navigateImages = (direction: number) => {
    const totalImages = variantImages.length
    setCurrentImageIndex((prev) => (prev + direction + totalImages) % totalImages)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in "${product.name}" - ${variant.name} variant. Please share more details.`
  )

  // Use portal to render modal at document.body level
  // This fixes position:fixed being relative to transformed ancestors (.fade-in-up)
  return createPortal(
    <div
      id="product-modal"
      className={`product-modal ${product ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="product-modal-backdrop" onClick={onClose}></div>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {variantImages.length > 1 && (
          <>
            <button
              className="product-modal-nav product-modal-prev"
              onClick={() => navigateImages(-1)}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="product-modal-nav product-modal-next"
              onClick={() => navigateImages(1)}
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}

        <div className="product-modal-body">
          <div className="product-modal-image-wrap">
            <Image
              id="modal-image"
              src={variantImages[currentImageIndex]}
              alt={`${product.name} - ${variant.name} - Image ${currentImageIndex + 1}`}
              width={600}
              height={600}
              className="product-modal-image"
              unoptimized
            />
            {product.badge && (
              <div
                id="modal-badge"
                className={`product-modal-badge ${product.onSale ? 'sale' : ''}`}
              >
                {product.badge}
              </div>
            )}
            {/* Image counter indicator */}
            <div className="product-modal-image-counter">
              {currentImageIndex + 1} / {variantImages.length}
            </div>
          </div>

          <div className="product-modal-info">
            <span className="product-modal-category" id="modal-category">
              {getCategoryName(product.category)}
            </span>
            <h2 className="product-modal-title" id="modal-title">
              {product.name}
            </h2>
            <p className="product-modal-variant" id="modal-variant" style={{ '--variant-color': variant.color } as React.CSSProperties}>
              {variant.name}
            </p>
            <p className="product-modal-desc" id="modal-desc">
              {product.description}
            </p>

            {/* Image thumbnails for this variant */}
            {variantImages.length > 1 && (
              <div className="product-modal-thumbs" id="modal-thumbs">
                {variantImages.map((img, i) => (
                  <div
                    key={i}
                    className={`product-modal-thumb ${i === currentImageIndex ? 'active' : ''}`}
                    onClick={() => selectImage(i)}
                  >
                    <Image
                      src={img}
                      alt={`${variant.name} - Image ${i + 1}`}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="product-modal-actions">
              <a
                id="modal-whatsapp"
                href={`https://wa.me/919640044469?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-modal-btn primary"
              >
                <i className="fa-brands fa-whatsapp"></i>
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

