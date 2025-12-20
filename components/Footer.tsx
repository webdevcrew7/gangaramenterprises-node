import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';

export default function Footer() {
  return (
    <footer id="contact" className="bg-royal-800 text-gray-300 py-12 border-t border-royal-600 w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-gold-500">
              <i className="fa-solid fa-crown text-2xl"></i>
              <span className="font-cinzel font-bold text-xl text-white">GANGARAM ENTERPRISES</span>
            </div>
            <p className="text-sm text-gray-400">
              Home Interiors & Furniture based in Hyderabad.
              <br />
              <span className="text-gold-500">Where Elegance Meets Comfort.</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-500 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-500 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-500 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-phone mt-1 text-gold-500"></i>
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="text-white font-bold text-lg hover:text-gold-400 transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-gold-500"></i>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-location-dot text-gold-500"></i>
                <span>{CONTACT_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2024 Gangaram Enterprises. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:text-green-500 transition-colors cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </Link>
            <Link
              href="#"
              className="text-lg hover:text-pink-500 transition-colors cursor-pointer"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
