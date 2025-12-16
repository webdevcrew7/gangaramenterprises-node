'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';

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
      className="relative h-[550px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden w-full"
    >
      <div className="absolute inset-0 z-0 w-full">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2000&auto=format&fit=crop"
          alt="Luxe Interiors"
          fill
          className="object-cover object-center scale-105 transition-transform duration-[10000ms] hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto relative z-10 text-white fade-in-up text-center md:text-left px-4">
        <span className="text-gold-400 tracking-[0.3em] text-xs md:text-sm uppercase font-semibold mb-4 block animate-fade-in">
          Where Elegance Meets Comfort
        </span>
        <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight drop-shadow-2xl">
          LUXE LIVING <br />
          <span className="text-gold-400/90 text-3xl md:text-6xl lg:text-7xl font-light">
            Home Interiors
          </span>
        </h2>
        <p className="text-base md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Premium Modular Kitchens, Home Theatres, and Custom Furniture by{' '}
          <span className="text-gold-400 font-semibold">{CONTACT_INFO.name}</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
          <button
            onClick={scrollToServices}
            className="group relative inline-block bg-gradient-to-r from-[#F7BA14] to-[#e6aa10] hover:from-[#e6aa10] hover:to-[#d49a0f] text-black font-bold py-4 px-10 rounded-lg shadow-premium transition-all duration-500 transform hover:-translate-y-2 hover:shadow-premium-lg cursor-pointer border border-transparent text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Services
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
          <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="group inline-flex items-center justify-center glass-dark border border-white/40 text-white font-semibold py-4 px-10 rounded-lg hover:bg-white/20 hover:border-gold-400/50 transition-all duration-500 gap-3 hover:shadow-gold"
          >
            <i className="fa-solid fa-phone text-gold-400 transition-transform duration-300 group-hover:scale-110"></i> 
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}

