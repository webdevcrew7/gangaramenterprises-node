'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="mobile-bottom-nav md:hidden">
      <Link href="/" className={`mobile-nav-item ${pathname === '/' ? 'active' : ''}`} data-nav="home">
        <i className="fa-solid fa-home"></i>
        <span>Home</span>
      </Link>
      <Link href="/#collections" className={`mobile-nav-item ${pathname === '/' ? '' : ''}`} data-nav="categories">
        <i className="fa-solid fa-th-large"></i>
        <span>Categories</span>
      </Link>
      <Link href="/services" className={`mobile-nav-item ${pathname === '/services' ? 'active' : ''}`} data-nav="services">
        <i className="fa-solid fa-briefcase"></i>
        <span>Services</span>
      </Link>
      <Link href="/contact" className={`mobile-nav-item ${pathname === '/contact' ? 'active' : ''}`} data-nav="contact">
        <i className="fa-solid fa-location-dot"></i>
        <span>Contact</span>
      </Link>
      <a href="tel:+919640044469"
        className="mobile-nav-item call-item">
        <i className="fa-solid fa-phone"></i>
        <span>Call</span>
      </a>
      <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer"
        className="mobile-nav-item whatsapp-item">
        <i className="fa-brands fa-whatsapp"></i>
        <span>WhatsApp</span>
      </a>
    </nav>
  )
}

