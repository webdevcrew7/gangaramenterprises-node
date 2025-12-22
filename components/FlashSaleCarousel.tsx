'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface CarouselSlide {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    features: string;
    image: string;
    gradient: string;
}

const slides: CarouselSlide[] = [
    {
        id: 1,
        title: 'Modular Kitchen',
        subtitle: 'Premium Collection',
        price: '₹49,999',
        features: 'High-gloss finish • Soft-close drawers • German hardware',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    },
    {
        id: 2,
        title: 'Home Theatre',
        subtitle: 'Cinematic Experience',
        price: '₹89,999',
        features: '7.1 Surround • 4K Projector • Acoustic Panels',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop',
        gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    },
    {
        id: 3,
        title: 'Luxury Sofas',
        subtitle: 'Comfort Redefined',
        price: '₹35,999',
        features: 'Italian leather • Recliner • 10-year warranty',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
        gradient: 'linear-gradient(135deg, #232526 0%, #414345 50%, #232526 100%)',
    },
    {
        id: 4,
        title: 'Custom Wardrobes',
        subtitle: 'Space Optimization',
        price: '₹29,999',
        features: 'Walk-in design • LED lighting • Mirror finish',
        image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=400&fit=crop',
        gradient: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
    },
];

export default function FlashSaleCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToSlide = useCallback((index: number) => {
        let newIndex = index;
        if (index < 0) newIndex = slides.length - 1;
        if (index >= slides.length) newIndex = 0;
        setCurrentSlide(newIndex);
    }, []);

    const nextSlide = useCallback(() => {
        goToSlide(currentSlide + 1);
    }, [currentSlide, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide(currentSlide - 1);
    }, [currentSlide, goToSlide]);

    // Auto-rotate
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    // Touch/swipe support
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        setTouchStart(null);
    };

    return (
        <div
            id="flash-sale-carousel"
            className="hidden md:block relative z-10 w-full max-w-5xl mx-auto mt-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="rounded-xl overflow-hidden shadow-2xl">
                {/* Carousel Track */}
                <div
                    id="carousel-track"
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {slides.map((slide) => (
                        <div key={slide.id} className="carousel-slide min-w-full">
                            <div
                                className="sale-banner relative overflow-hidden cursor-pointer"
                                style={{ background: slide.gradient }}
                            >
                                {/* Decorative Floating Elements */}
                                <div className="floating-decor" style={{ top: '10%', left: '5%' }}>
                                    ✨
                                </div>
                                <div className="floating-decor" style={{ top: '60%', right: '10%', animationDelay: '1s' }}>
                                    🌟
                                </div>
                                <div className="falling-leaf" style={{ left: '15%', animationDelay: '0s' }}></div>
                                <div className="falling-leaf" style={{ left: '75%', animationDelay: '2s' }}></div>

                                <div className="container mx-auto h-full flex items-center justify-center gap-8 px-8 py-8">
                                    {/* Product Image */}
                                    <div className="bg-white rounded-lg shadow-2xl p-3 flex-shrink-0">
                                        <div className="relative w-48 h-48 rounded overflow-hidden">
                                            <Image
                                                src={slide.image}
                                                alt={slide.title}
                                                fill
                                                className="object-cover"
                                                sizes="192px"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-white text-left">
                                        <p className="text-gold-400 text-sm uppercase tracking-wider mb-1">{slide.subtitle}</p>
                                        <h4 className="font-serif text-3xl font-bold mb-2">{slide.title}</h4>
                                        <p className="text-2xl font-bold mb-2">
                                            Starting <span className="text-gold-400">{slide.price}</span>
                                        </p>
                                        <p className="text-white/70 text-sm">{slide.features}</p>
                                        <button className="mt-4 bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2">
                                            <i className="fa-brands fa-whatsapp"></i>
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrow Navigation */}
                <button
                    id="carousel-prev"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                    id="carousel-next"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    aria-label="Next slide"
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            {/* Carousel Dots */}
            <div id="carousel-dots" className="flex justify-center gap-2 py-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
