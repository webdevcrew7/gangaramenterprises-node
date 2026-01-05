'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Product, ProductVariant } from '@/types'

interface CartItem extends Product {
  cartItemId: string
  selectedVariant: ProductVariant
  image: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, variantId?: string) => void
  removeFromCart: (cartItemId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, variantId?: string) => {
    const variant = variantId
      ? product.variants.find(v => v.id === variantId) || product.variants[0]
      : product.variants[0]

    const cartItemId = variantId || `${product.id}-${variant.id}`

    setCart(prev => {
      const existingItem = prev.find(item => item.cartItemId === cartItemId)
      if (existingItem) {
        return prev // Already in cart
      }
      return [...prev, {
        ...product,
        cartItemId,
        selectedVariant: variant,
        image: variant.image
      }]
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

