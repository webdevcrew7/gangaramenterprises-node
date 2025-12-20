'use client';

import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';
import { useMobileMenuContext } from './MobileMenuProvider';
import AnnouncementBar from './AnnouncementBar';

export default function Navbar() {
  const { isOpen, toggle } = useMobileMenuContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999]">
      {/* Navigation Bar */}
      <nav className="bg-royal-700 border-b border-gold-500/30">
        <div className="container mx-auto py-2 md:py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-2 py-1">
            <div className="logo-text">
              <p className="brand-name">GangaramEnterprises</p>
              <p className="brand-sub">Home Interiors & Furniture</p>
            </div>
          </Link>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-white/80 hover:text-gold-400 transition-colors duration-300 text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-white/80 hover:text-gold-400 transition-colors duration-300 text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-gold-400 transition-colors duration-300 text-sm font-medium"
            >
              Contact
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center gap-2 bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-400 px-4 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-phone text-sm"></i>
              <span className="text-sm font-semibold">{CONTACT_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-btn"
            onClick={toggle}
            className="md:hidden p-2.5 text-white focus:outline-none hover:text-gold-400 transition-all duration-300 rounded-lg hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <i
              id="mobile-menu-icon"
              className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl transition-transform duration-300`}
            ></i>
          </button>
        </div>
      </nav>

      {/* Scrolling Announcement Banner */}
      <AnnouncementBar />
    </header>
  );
}
