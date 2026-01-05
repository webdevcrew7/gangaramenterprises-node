'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FlashSaleCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Modular Kitchen',
      price: '₹49,999',
      description: 'Premium Finish • Soft Close • Custom Designs',
      image: '/assets/Interiors/Design1.webp',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    },
    {
      title: 'Premium Sofas',
      price: '₹24,999',
      description: 'Sankranti Special • 25% OFF • All Variants',
      image: '/assets/Furniture/sofa1.webp',
      gradient: 'linear-gradient(135deg, #4a1942 0%, #7b2869 50%, #9e4770 100%)',
    },
    {
      title: 'Home Theatre',
      price: '₹89,999',
      description: '4K Projector • Dolby Atmos • Complete Setup',
      image: '/assets/Home Theatre/HT1.webp',
      gradient: 'linear-gradient(135deg, #0d7377 0%, #14919b 50%, #32e0c4 100%)',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToSaleCategory = () => {
    const collectionsSection = document.getElementById('collections')
    const saleBtn = document.querySelector('#category-filters [data-category="sale"]') as HTMLElement

    if (collectionsSection && saleBtn) {
      // Click the category button first to update the state
      saleBtn.click()

      // Then scroll after React re-renders
      requestAnimationFrame(() => {
        const headerOffset = 80
        const elementPosition = collectionsSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      })
    } else if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div id="flash-sale-carousel" className="hidden md:flex relative z-10 w-full mt-6 pb-6 flex-grow flex-col justify-end">
      <div className="p-3 md:p-4">
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <div
            id="carousel-track"
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide min-w-full">
                <div
                  className="sale-banner relative h-[22vh] md:h-[28vh] overflow-hidden cursor-pointer"
                  onClick={scrollToSaleCategory}
                  style={{ background: slide.gradient }}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {index === 0 && (
                      <>
                        <div className="floating-decor" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>✨</div>
                        <div className="floating-decor" style={{ top: '60%', left: '8%', animationDelay: '0.5s' }}>🎆</div>
                        <div className="floating-decor" style={{ top: '20%', right: '15%', animationDelay: '1s' }}>🎇</div>
                        <div className="floating-decor" style={{ top: '70%', right: '10%', animationDelay: '1.5s' }}>✨</div>
                        <div className="falling-leaf" style={{ left: '15%', animationDelay: '0s' }}></div>
                        <div className="falling-leaf" style={{ left: '45%', animationDelay: '1s' }}></div>
                        <div className="falling-leaf" style={{ left: '75%', animationDelay: '2s' }}></div>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <div className="floating-decor" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>🪁</div>
                        <div className="floating-decor" style={{ top: '55%', left: '5%', animationDelay: '0.7s' }}>☀️</div>
                        <div className="floating-decor" style={{ top: '25%', right: '12%', animationDelay: '1.2s' }}>🪁</div>
                        <div className="floating-decor" style={{ top: '65%', right: '8%', animationDelay: '0.3s' }}>🌾</div>
                        <div className="falling-leaf gold-leaf" style={{ left: '20%', animationDelay: '0.3s' }}></div>
                        <div className="falling-leaf gold-leaf" style={{ left: '50%', animationDelay: '1.3s' }}></div>
                        <div className="falling-leaf gold-leaf" style={{ left: '80%', animationDelay: '2.3s' }}></div>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <div className="floating-decor" style={{ top: '12%', left: '8%', animationDelay: '0.2s' }}>🎬</div>
                        <div className="floating-decor" style={{ top: '50%', left: '5%', animationDelay: '0.9s' }}>🎵</div>
                        <div className="floating-decor" style={{ top: '18%', right: '10%', animationDelay: '1.4s' }}>🎧</div>
                        <div className="floating-decor" style={{ top: '60%', right: '12%', animationDelay: '0.6s' }}>🎬</div>
                      </>
                    )}
                  </div>

                  <div className="container mx-auto h-full flex items-center justify-center gap-4 md:gap-8 px-4 md:px-8">
                    <div className="relative z-10 w-32 md:w-52 lg:w-64 flex-shrink-0">
                      <div className="bg-white rounded-lg shadow-2xl p-2 md:p-3 transform hover:scale-105 transition-transform duration-300">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={256}
                          height={176}
                          className="w-full h-24 md:h-36 lg:h-44 object-cover rounded"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="relative z-10 text-white">
                      {index === 0 && (
                        <h4 className="text-lg md:text-2xl lg:text-3xl font-bold text-gold-400 font-serif mb-1 whitespace-nowrap">
                          {slide.title}
                        </h4>
                      )}
                      {index === 1 && (
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-yellow-300 font-serif mb-1">
                          {slide.title}
                        </h3>
                      )}
                      {index === 2 && (
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-emerald-200 font-serif mb-1">
                          {slide.title}
                        </h3>
                      )}
                      <p className="text-xl md:text-3xl lg:text-4xl font-bold mb-1">
                        {index === 1 ? 'From' : 'Starting'} <span className={index === 0 ? 'text-gold-400' : index === 1 ? 'text-yellow-300' : 'text-emerald-200'}>{slide.price}</span>
                      </p>
                      <p className="text-white/80 text-xs md:text-sm">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            id="carousel-prev"
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full items-center justify-center transition-all z-30 shadow-lg"
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left text-base"></i>
          </button>
          <button
            id="carousel-next"
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-10 h-10 rounded-full items-center justify-center transition-all z-30 shadow-lg"
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right text-base"></i>
          </button>
        </div>
      </div>

      <div id="carousel-dots" className="hidden md:flex justify-center gap-2 py-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'active bg-white' : 'bg-white/40 hover:bg-white/60'
              }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

