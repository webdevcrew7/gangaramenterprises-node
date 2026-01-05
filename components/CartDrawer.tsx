'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import { getCategoryName } from '@/lib/products'
import Image from 'next/image'

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Listen for cart toggle events
    const handleToggle = () => setIsOpen(prev => !prev)
    const handleEvent = () => handleToggle()
    window.addEventListener('toggleCart', handleEvent)
    return () => window.removeEventListener('toggleCart', handleEvent)
  }, [])

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

  const handleCheckout = () => {
    const message = "Hello Aravind Reddy, I am interested in the following services from Gangaram Enterprises: \n" + 
      cart.map(i => `- ${i.name}${i.selectedVariant ? ` - ${i.selectedVariant.name}` : ''}`).join("\n")
    const whatsappUrl = `https://wa.me/919640044469?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    clearCart()
    setIsOpen(false)
  }

  const startShopping = () => {
    setIsOpen(false)
    setTimeout(() => {
      const collectionsSection = document.getElementById('collections')
      if (collectionsSection) {
        collectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  if (!isOpen) return null

  return (
    <>
      <div
        id="cart-overlay"
        className="fixed inset-0 bg-black/70 z-[60] transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        id="cart-drawer"
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-royal-700 text-white">
          <h3 className="font-serif text-xl font-bold text-gold-500">Inquiry List</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div id="cart-items" className="flex-grow overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div id="cart-empty-state" className="flex flex-col items-center justify-center h-full text-center text-slate-400">
              <i className="fa-solid fa-clipboard-list text-6xl mb-4 text-slate-200"></i>
              <p className="text-lg font-medium text-slate-600">No items selected</p>
              <p className="text-sm mb-6">Add items to request a quote.</p>
              <button
                onClick={startShopping}
                className="bg-royal-700 text-gold-500 px-6 py-2 rounded-sm text-sm font-bold hover:bg-royal-600 transition-colors"
              >
                Browse Services
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cartItemId}
                className="flex gap-4 p-2 bg-gray-50 rounded-lg border border-gray-100 shadow-sm transition-all"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <h4 className="font-serif font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 flex items-center">
                    {item.selectedVariant && (
                      <>
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: item.selectedVariant.color }}
                        ></span>
                        {item.selectedVariant.name}
                      </>
                    )}
                    {!item.selectedVariant && getCategoryName(item.category)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="remove-from-cart-btn text-red-400 hover:text-red-600 px-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div id="cart-footer" className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6 text-xl font-serif font-bold text-slate-900">
              <span>Items</span>
              <span id="cart-total-count">{cart.length}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gold-500 text-black py-3 rounded-sm font-bold shadow hover:bg-gold-600 transition-colors flex justify-center items-center gap-2"
            >
              Request Quote via WhatsApp <i className="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Helper function to toggle cart from anywhere
export function toggleCart() {
  window.dispatchEvent(new Event('toggleCart'))
}

