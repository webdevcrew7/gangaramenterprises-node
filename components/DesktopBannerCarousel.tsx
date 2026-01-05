'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function DesktopBannerCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const slides = [
        '/assets/banners/banner.png',
        '/assets/banners/banner.jpg'
    ]

    useEffect(() => {
        if (isDragging.current) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [slides.length, currentSlide])

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDragging.current = true
        startX.current = e.clientX
        setIsTransitioning(false)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current) return
        const currentX = e.clientX
        const diff = currentX - startX.current
        setDragOffset(diff)
    }, [])

    const handleMouseUp = useCallback(() => {
        if (!isDragging.current) return
        isDragging.current = false
        setIsTransitioning(true)

        const containerWidth = containerRef.current?.offsetWidth || 800
        const threshold = containerWidth * 0.15

        if (dragOffset > threshold && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        } else if (dragOffset < -threshold && currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1)
        }

        setDragOffset(0)
    }, [dragOffset, currentSlide, slides.length])

    const handleMouseLeave = useCallback(() => {
        if (isDragging.current) {
            handleMouseUp()
        }
    }, [handleMouseUp])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const getTransform = () => {
        const containerWidth = containerRef.current?.offsetWidth || 800
        const slideOffset = currentSlide * containerWidth
        return `translateX(${-slideOffset + dragOffset}px)`
    }

    return (
        <div className="hidden md:block absolute inset-0 z-10">
            <div
                ref={containerRef}
                className="relative overflow-hidden cursor-grab active:cursor-grabbing h-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="flex h-full"
                    style={{
                        transform: getTransform(),
                        transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-full h-full cursor-pointer select-none"
                        >
                            <Image
                                src={slide}
                                alt={`Banner ${index + 1}`}
                                width={1920}
                                height={800}
                                className="w-full h-full object-cover pointer-events-none"
                                draggable={false}
                                priority={index === 0}
                                unoptimized
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                    aria-label="Next slide"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                {/* Dot Indicators - Inside carousel */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white scale-125 shadow-lg'
                                : 'bg-white/50 hover:bg-white/70'
                                }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
