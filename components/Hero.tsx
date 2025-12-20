'use client';

import { CONTACT_INFO } from '@/constants/contact';
import FlashSaleCarousel from './FlashSaleCarousel';
import MobileSaleBanner from './MobileSaleBanner';

export default function Hero() {
  const scrollToServices = () => {
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden w-full hero-gradient-section"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 w-full hero-gradient"></div>

      {/* Hero Content */}
      <div className="container mx-auto pt-1 md:pt-10 z-10 text-white text-center px-4">
        <h1 className="hero-title mb-2 md:mb-4">We Design for your Comfort</h1>
        <p className="hero-subtext max-w-2xl mx-auto text-sm md:text-base mb-2">
          Premium Sofas, Furniture, Interior design & Decor by{' '}
          <span className="text-gold-400 font-semibold">{CONTACT_INFO.name}</span>.
        </p>
        {/* Buttons - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={scrollToServices}
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-500 text-black font-bold py-3 px-8 rounded-full shadow-gold transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <span>Explore Services</span>
            <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </button>
          <a
            href={CONTACT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Mobile Sale Banner Carousel */}
      <MobileSaleBanner />

      {/* Desktop Flash Sale Carousel */}
      <FlashSaleCarousel />
    </section>
  );
}
