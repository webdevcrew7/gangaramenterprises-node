'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function MobileSaleBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const slides = [
    '/assets/banners/square.png',
    '/assets/banners/square.png',
    '/assets/banners/square.png',
  ]

  useEffect(() => {
    if (isDragging.current) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [slides.length, currentSlide])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true
    startX.current = e.touches[0].clientX
    setIsTransitioning(false)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return
    const currentX = e.touches[0].clientX
    const diff = currentX - startX.current
    setDragOffset(diff)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    setIsTransitioning(true)

    const containerWidth = containerRef.current?.offsetWidth || 400
    const threshold = containerWidth * 0.2 // 20% of width

    if (dragOffset > threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else if (dragOffset < -threshold && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }

    setDragOffset(0)
  }, [dragOffset, currentSlide, slides.length])

  const scrollToSaleCategory = () => {
    if (Math.abs(dragOffset) > 5) return // Prevent click during drag

    const collectionsSection = document.getElementById('collections')
    const saleBtn = document.querySelector('#category-filters [data-category="sale"]') as HTMLElement

    if (collectionsSection && saleBtn) {
      saleBtn.click()
      requestAnimationFrame(() => {
        const headerOffset = 80
        const elementPosition = collectionsSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      })
    } else if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const gap = 16 // Gap between slides in pixels

  const getTransform = () => {
    const containerWidth = containerRef.current?.offsetWidth || 400
    const slideOffset = currentSlide * (containerWidth + gap)
    return `translateX(${-slideOffset + dragOffset}px)`
  }

  return (
    <div id="mobile-sale-banner" className="md:hidden relative z-10 w-full mt-6 pb-6">
      <div className="p-2">
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden shadow-2xl touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            id="mobile-carousel-track"
            className="flex gap-4"
            style={{
              transform: getTransform(),
              transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full cursor-pointer select-none"
                onClick={scrollToSaleCategory}
              >
                <Image
                  src={slide}
                  alt={`Sale Banner ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover pointer-events-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="mobile-carousel-dots" className="flex justify-center gap-2 py-1">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
