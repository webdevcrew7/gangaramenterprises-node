'use client';

import Image from 'next/image';
import { useCartContext } from './CartProvider';
import { generateWhatsAppMessage } from '@/utils/cart';

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, isCartDrawerOpen, closeCartDrawer } =
    useCartContext();

  const handleCheckout = () => {
    const url = generateWhatsAppMessage(cart);
    window.open(url, '_blank');
    clearCart();
    closeCartDrawer();
  };

  const handleStartShopping = () => {
    closeCartDrawer();
    setTimeout(() => {
      const element = document.getElementById('collections');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (!isCartDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-[60] transition-opacity duration-300 opacity-100"
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-black text-white">
          <h3 className="font-serif text-xl font-bold text-gold-500">Inquiry List</h3>
          <button
            onClick={closeCartDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
              <i className="fa-solid fa-clipboard-list text-6xl mb-4 text-slate-200"></i>
              <p className="text-lg font-medium text-slate-600">No items selected</p>
              <p className="text-sm mb-6">Add items to request a quote.</p>
              <button
                onClick={handleStartShopping}
                className="bg-black text-gold-500 px-6 py-2 rounded-sm text-sm font-bold hover:bg-gray-900 transition-colors"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-2 bg-gray-50 rounded-lg border border-gray-100 shadow-sm transition-all animate-fade-in"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h4 className="font-serif font-bold text-sm text-slate-800 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 px-2"
                    aria-label="Remove from cart"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6 text-xl font-serif font-bold text-slate-900">
              <span>Items</span>
              <span>{cart.length}</span>
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
  );
}

