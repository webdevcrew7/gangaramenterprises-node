'use client';

import Link from 'next/link';
import { useMobileMenuContext } from './MobileMenuProvider';
import { CONTACT_INFO } from '@/constants/contact';

export default function MobileMenu() {
  const { isOpen, close } = useMobileMenuContext();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      close();
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      setTimeout(() => close(), 100);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-[60] transition-opacity duration-300 opacity-100"
        onClick={close}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-black text-white">
          <h3 className="font-serif text-xl font-bold text-gold-500">Menu</h3>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#collections');
            }}
            className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm border-b border-gray-100"
          >
            <i className="fa-solid fa-briefcase text-gold-500 w-5"></i>
            <span>Services</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm border-b border-gray-100"
          >
            <i className="fa-solid fa-location-dot text-gold-500 w-5"></i>
            <span>Contact (Address)</span>
          </a>
          <Link
            href={CONTACT_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick('external')}
            className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-green-500 hover:text-white transition-all rounded-sm border-b border-gray-100"
          >
            <i className="fa-brands fa-whatsapp text-green-500 w-5"></i>
            <span>Enquiry now</span>
          </Link>
          <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            onClick={() => handleLinkClick('external')}
            className="mobile-menu-link flex items-center gap-3 px-4 py-3 text-slate-800 font-semibold hover:bg-gold-500 hover:text-black transition-all rounded-sm"
          >
            <i className="fa-solid fa-phone text-gold-500 w-5"></i>
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </>
  );
}

