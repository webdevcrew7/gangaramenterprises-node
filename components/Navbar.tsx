'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';
import { useMobileMenuContext } from './MobileMenuProvider';

export default function Navbar() {
  const { isOpen, toggle } = useMobileMenuContext();

  return (
    <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-xl shadow-lg transition-all duration-500 border-b border-gold-500/30 w-full overflow-hidden">
      <div className="container mx-auto py-3 md:py-4 flex justify-between items-center relative min-h-[80px] md:min-h-[90px]">
        {/* Left Side: Contact Details (Desktop) */}
        <div className="hidden md:flex flex-col justify-center text-xs text-slate-700 font-medium space-y-1.5">
          <div className="flex items-center gap-2.5 group">
            <i className="fa-solid fa-user text-gold-500 transition-transform duration-300 group-hover:scale-110"></i>
            <span className="font-bold text-black transition-colors duration-300 group-hover:text-gold-600">{CONTACT_INFO.name}</span>
          </div>
          <div className="flex items-center gap-2.5 group">
            <i className="fa-solid fa-phone text-gold-500 transition-transform duration-300 group-hover:scale-110"></i>
            <span className="font-bold transition-colors duration-300 group-hover:text-gold-600">{CONTACT_INFO.phone}</span>
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="#" className="logo-center group">
          <Image
            src="/assets/luxe-logo.png"
            alt="Luxe Living Logo"
            width={300}
            height={90}
            className="logo-img transition-all duration-500 group-hover:scale-105"
            priority
            unoptimized
          />
        </Link>

        {/* Right Side: Menu */}
        <div className="flex items-center gap-6">
          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <a 
              href="#collections" 
              className="text-slate-700 hover:text-gold-600 transition-all duration-300 relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="text-slate-700 hover:text-gold-600 transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-btn"
            onClick={toggle}
            className="md:hidden p-2.5 text-slate-900 focus:outline-none hover:text-gold-600 transition-all duration-300 rounded-lg hover:bg-gold-500/10"
            aria-label="Toggle menu"
          >
            <i
              id="mobile-menu-icon"
              className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl transition-transform duration-300`}
            ></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

