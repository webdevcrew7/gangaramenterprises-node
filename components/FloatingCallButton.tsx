'use client';

import { CONTACT_INFO } from '@/constants/contact';

export default function FloatingCallButton() {
    return (
        <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="fixed bottom-20 right-4 sm:bottom-28 sm:right-6 z-[9998] w-14 h-14 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gold-500"
            aria-label="Call us"
        >
            <i className="fa-solid fa-phone text-xl text-royal-700"></i>
        </a>
    );
}
