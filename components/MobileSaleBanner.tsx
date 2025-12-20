'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface BannerSlide {
    id: number;
    image: string;
    alt: string;
}

// Banner images from public/banners folder
// Duplicate the same banner to show carousel functionality
// Replace with different banners as you add them to public/banners
const bannerSlides: BannerSlide[] = [
    {
        id: 1,
        image: '/banners/sale-banner.jpg',
        alt: 'Festive Sale - Premium Furniture',
    },
    {
        id: 2,
        image: '/banners/sale-banner.jpg', // Same banner duplicated
        alt: 'Special Offers on Home Interiors',
    },
    {
        id: 3,
        image: '/banners/sale-banner.jpg', // Same banner duplicated
        alt: 'Home Theatre & Modular Kitchen Deals',
    },
];

export default function MobileSaleBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const goToSlide = useCallback((index: number) => {
        let newIndex = index;
        if (index < 0) newIndex = bannerSlides.length - 1;
        if (index >= bannerSlides.length) newIndex = 0;
        setCurrentSlide(newIndex);
    }, []);

    const nextSlide = useCallback(() => {
        goToSlide(currentSlide + 1);
    }, [currentSlide, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide(currentSlide - 1);
    }, [currentSlide, goToSlide]);

    // Auto-rotate every 4 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    return (
        <div className="md:hidden relative w-full mt-1 px-3">
            {/* Carousel Container with border radius and shadow */}
            <div className="relative overflow-hidden rounded-xl shadow-xl">
                {/* Gold accent overlay at bottom */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to top, rgba(197, 160, 89, 0.7), transparent)',
                    }}
                />

                {/* Carousel Track */}
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {bannerSlides.map((slide) => (
                        <div key={slide.id} className="min-w-full">
                            {/* Aspect ratio 16:9 for compact height */}
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={slide.image}
                                    alt={slide.alt}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority={slide.id === 1}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-2">
                {bannerSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                            ? 'w-6 h-2 bg-gold-500'
                            : 'w-2 h-2 bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
