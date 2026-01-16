'use client'

import { useEffect, useState, useRef } from 'react'

interface Testimonial {
    id: number
    youtube_url: string
    video_id: string
    title: string
    display_order: number
}

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials')
            const data = await response.json()
            setTestimonials(data.testimonials || [])
        } catch (error) {
            console.error('Failed to fetch testimonials:', error)
        } finally {
            setLoading(false)
        }
    }

    const scrollToIndex = (index: number) => {
        if (!trackRef.current) return
        const track = trackRef.current
        const items = track.children
        if (items[index]) {
            const item = items[index] as HTMLElement
            track.scrollTo({
                left: item.offsetLeft - 16,
                behavior: 'smooth'
            })
        }
        setCurrentIndex(index)
    }

    const handlePrev = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : testimonials.length - 1
        scrollToIndex(newIndex)
    }

    const handleNext = () => {
        const newIndex = currentIndex < testimonials.length - 1 ? currentIndex + 1 : 0
        scrollToIndex(newIndex)
    }

    // Don't render section if no testimonials
    if (!loading && testimonials.length === 0) {
        return null
    }

    return (
        <section id="testimonials" className="py-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">
                        Customer Stories
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2">
                        Video Testimonials
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Hear from our happy customers about their experience with Gangaram Enterprises
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <i className="fa-solid fa-spinner fa-spin text-4xl text-gold-500"></i>
                    </div>
                ) : (
                    <div className="relative px-0 md:px-14">
                        {/* Navigation Arrows */}
                        {testimonials.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gold-500 hover:text-white transition-all"
                                    aria-label="Previous testimonial"
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gold-500 hover:text-white transition-all"
                                    aria-label="Next testimonial"
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </>
                        )}

                        {/* Video Carousel */}
                        <div
                            ref={trackRef}
                            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
                                >
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        {/* YouTube Embed */}
                                        <div className="relative pt-[56.25%]">
                                            <iframe
                                                className="absolute inset-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${testimonial.video_id}?rel=0`}
                                                title={testimonial.title || `Customer Testimonial ${index + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        {/* Title */}
                                        {testimonial.title && (
                                            <div className="p-4">
                                                <h3 className="font-medium text-gray-800 text-center">
                                                    {testimonial.title}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Carousel Dots */}
                        {testimonials.length > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollToIndex(index)}
                                        className={`h-2 rounded-full transition-all ${currentIndex === index
                                            ? 'w-6 bg-gold-500'
                                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
