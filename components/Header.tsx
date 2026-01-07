'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'
import AnnouncementBar from './AnnouncementBar'
import { useCart } from '@/contexts/CartContext'
import { toggleCart } from './CartDrawer'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-[9999]">
      {/* Nav - solid on mobile, transparent/solid on desktop based on scroll */}
      <nav className={`bg-royal-700 border-b border-gold-500/30 transition-all duration-300 ${isScrolled
        ? 'md:bg-royal-700 md:shadow-lg md:border-gold-500/30'
        : 'md:bg-transparent md:border-white/30'
        }`}>
        <div className="container mx-auto px-4 py-3 md:py-3 flex justify-center items-center relative">
          {/* Left Desktop Nav Links */}
          <div className="desktop-nav hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-white absolute left-4 lg:left-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            <Link href="/about" className="nav-link relative pb-1 hover:text-gold-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">About</Link>
            <Link href="/services" className="nav-link relative pb-1 hover:text-gold-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Services</Link>
          </div>

          {/* Logo - centered on all screens */}
          <Link href="/" className="flex items-center" aria-label="Gangaram Enterprises - Home">
            <Image
              src="/assets/new-logo.png"
              alt="Gangaram Enterprises Logo"
              width={150}
              height={150}
              className="h-14 md:h-24 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              priority
            />
          </Link>

          {/* Right Desktop Nav Links */}
          <div className="desktop-nav hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-white absolute right-4 lg:right-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            <Link href="/contact" className="nav-link relative pb-1 hover:text-gold-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Contact</Link>
            <a href="tel:+919640044469" className="text-gold-400 font-bold flex items-center gap-1">
              <i className="fa-solid fa-phone"></i> 96400 44469
            </a>
          </div>

          {/* Mobile Hamburger Button - positioned absolutely on right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white focus:outline-none hover:text-gold-500 transition-colors"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </nav>

      {/* Announcement Bar - only visible on mobile */}
      <div className="md:hidden">
        <AnnouncementBar />
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
