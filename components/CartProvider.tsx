'use client';

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  toggleCartDrawer: () => void;
  closeCartDrawer: () => void;
  openCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const addToCart = useCallback((product: Product): boolean => {
    let wasInCart = false;
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        wasInCart = true;
        return prev;
      }
      return [...prev, { ...product }];
    });
    return wasInCart;
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleCartDrawer = useCallback(() => {
    setIsCartDrawerOpen((prev) => !prev);
  }, []);

  const closeCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(false);
  }, []);

  const openCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(true);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartDrawerOpen,
        toggleCartDrawer,
        closeCartDrawer,
        openCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
}

