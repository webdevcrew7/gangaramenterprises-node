'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-[60] transition-opacity duration-300"
        onClick={onClose}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-royal-700 text-white">
          <h3 className="font-serif text-xl font-bold text-gold-500">Menu</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          <Link href="/" className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold bg-gold-100 rounded-sm border-b border-gray-100">
            <i className="fa-solid fa-home text-gold-500 w-5"></i>
            <span>Home</span>
          </Link>
          <Link href="/about" className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm border-b border-gray-100">
            <i className="fa-solid fa-info-circle text-gold-500 w-5"></i>
            <span>About Us</span>
          </Link>
          <Link href="/services" className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm border-b border-gray-100">
            <i className="fa-solid fa-briefcase text-gold-500 w-5"></i>
            <span>Services</span>
          </Link>
          <Link href="/contact" className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm border-b border-gray-100">
            <i className="fa-solid fa-location-dot text-gold-500 w-5"></i>
            <span>Contact</span>
          </Link>
          <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer"
            className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-green-500 hover:text-white transition-all rounded-sm border-b border-gray-100">
            <i className="fa-brands fa-whatsapp text-green-500 w-5"></i>
            <span>WhatsApp</span>
          </a>
          <a href="tel:+919640044469"
            className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm">
            <i className="fa-solid fa-phone text-gold-500 w-5"></i>
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </>
  )
}

