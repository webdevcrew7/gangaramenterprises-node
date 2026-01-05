'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Product } from '@/types'
import { getCategoryName } from '@/lib/products'
import Image from 'next/image'

interface ProductModalProps {
  product: Product | null
  variantId: string | null
  onClose: () => void
}

export default function ProductModal({ product, variantId, onClose }: ProductModalProps) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (product && variantId) {
      const index = product.variants.findIndex(v => v.id === variantId)
      if (index !== -1) {
        setCurrentVariantIndex(index)
      }
    }
  }, [product, variantId])

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft') navigateModal(-1)
        if (e.key === 'ArrowRight') navigateModal(1)
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

  if (!product || !mounted) return null

  const variant = product.variants[currentVariantIndex]

  const navigateModal = (direction: number) => {
    const totalVariants = product.variants.length
    setCurrentVariantIndex((prev) => (prev + direction + totalVariants) % totalVariants)
  }

  const selectVariant = (index: number) => {
    setCurrentVariantIndex(index)
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

        {product.variants.length > 1 && (
          <>
            <button
              className="product-modal-nav product-modal-prev"
              onClick={() => navigateModal(-1)}
              aria-label="Previous variant"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="product-modal-nav product-modal-next"
              onClick={() => navigateModal(1)}
              aria-label="Next variant"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}

        <div className="product-modal-body">
          <div className="product-modal-image-wrap">
            <Image
              id="modal-image"
              src={variant.image}
              alt={`${product.name} - ${variant.name}`}
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

            {product.variants.length > 1 && (
              <div className="product-modal-thumbs" id="modal-thumbs">
                {product.variants.map((v, i) => (
                  <div
                    key={v.id}
                    className={`product-modal-thumb ${i === currentVariantIndex ? 'active' : ''}`}
                    onClick={() => selectVariant(i)}
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
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

