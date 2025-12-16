'use client';

import Link from 'next/link';
import { useWhatsAppContext } from './WhatsAppProvider';
import { CONTACT_INFO } from '@/constants/contact';
import { useCartContext } from './CartProvider';
import { generateWhatsAppMessage } from '@/utils/cart';

export default function WhatsAppToggle() {
  const { isOpen, toggle, close } = useWhatsAppContext();
  const { cart } = useCartContext();

  const quickMessages = [
    {
      text: 'Hello, I need a quote',
      message: 'Hello, I need a quote for your services.',
    },
    {
      text: 'Modular Kitchen Inquiry',
      message: 'I am interested in your Modular Kitchen services.',
    },
    {
      text: 'Home Theatre Setup',
      message: 'I would like to know more about your Home Theatre installation services.',
    },
    {
      text: 'General Inquiry',
      message: 'I have a general inquiry about your services.',
    },
  ];

  const handleQuickMessage = (message: string) => {
    const url = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    close();
  };

  const handleCartCheckout = () => {
    if (cart.length > 0) {
      const url = generateWhatsAppMessage(cart);
      window.open(url, '_blank');
      close();
    }
  };

  return (
    <>
      {/* Toggle Button - Floating at bottom right */}
      <button
        onClick={toggle}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[9999] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-premium-lg border-2 border-white/20 hover:border-white/40 hover:scale-110 active:scale-95 transition-all duration-500 flex items-center justify-center group relative px-4 py-4 sm:px-5 sm:py-4 gap-2.5 min-w-[64px] sm:min-w-[160px] animate-float ${
          isOpen ? 'scale-95' : ''
        }`}
        aria-label="Toggle WhatsApp widget"
        aria-expanded={isOpen}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-full"></div>
        <i className="fa-brands fa-whatsapp text-xl sm:text-2xl relative z-10 transition-transform duration-300 group-hover:scale-110"></i>
        <span className="hidden sm:inline text-xs font-bold whitespace-nowrap relative z-10">Enquiry now</span>
        <div className="hidden sm:block absolute -top-14 right-0 bg-gradient-to-r from-black to-gray-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-premium opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap border border-gold-500/50 transform translate-y-2 group-hover:translate-y-0">
          Enquiry now
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-black border-r border-b border-gold-500/50"></div>
        </div>
      </button>

      {/* Widget (shown when isOpen is true) */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] transition-opacity duration-500 opacity-100"
            onClick={close}
            aria-hidden="true"
          />

          {/* Widget */}
          <div
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 md:bottom-28 md:right-8 w-[calc(100vw-2rem)] sm:w-[320px] md:w-[380px] max-w-[380px] bg-white rounded-2xl shadow-premium-lg z-[100] overflow-hidden border border-gray-200/50 animate-slide-up"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-widget-title"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                </div>
                <div>
                  <h3 id="whatsapp-widget-title" className="font-bold text-base">
                    Luxe Living
                  </h3>
                  <p className="text-xs text-green-100">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={close}
                className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Close WhatsApp widget"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 max-h-[400px] overflow-y-auto bg-gradient-to-b from-white to-gray-50/30">
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  Choose a quick message or send a custom inquiry:
                </p>

                {/* Quick Messages */}
                <div className="space-y-3 mb-5">
                  {quickMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(msg.message)}
                      className="w-full text-left px-5 py-3 bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-green-100 border border-gray-200 hover:border-green-300 rounded-xl text-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
                    >
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-message text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                        <span className="group-hover:text-green-700 transition-colors duration-300">{msg.text}</span>
                      </span>
                    </button>
                  ))}
                </div>

                {/* Cart Checkout Option */}
                {cart.length > 0 && (
                  <button
                    onClick={handleCartCheckout}
                    className="w-full px-5 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 mb-4 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    Send Inquiry List ({cart.length} items)
                  </button>
                )}

                {/* Direct WhatsApp Link */}
                <Link
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block w-full px-5 py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  Open WhatsApp Chat
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

