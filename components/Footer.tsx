import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-black via-gray-900 to-black text-gray-400 py-16 border-t border-gold-500/20 w-full overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.05),transparent_50%)]"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="fade-in-up">
            <div className="flex items-center gap-3 mb-6 text-gold-400">
              <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/20 p-2 rounded-lg border border-gold-500/30">
                <i className="fa-solid fa-crown text-2xl text-gold-400"></i>
              </div>
              <span className="font-serif font-bold text-2xl text-white bg-gradient-to-r from-white to-gold-400 bg-clip-text text-transparent">LUXE LIVING</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Home Interiors & Furniture based in Hyderabad. <br />
              <span className="text-gold-400 font-semibold">Where Elegance Meets Comfort.</span>
            </p>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></span>
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {['Indoor Ceiling (POP/Gypsum)', 'Modular Kitchens & Cupboards', 'Home Theatre & Audio Systems', 'UPVC Windows & Glass Railing'].map((service, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300 hover:text-gold-400 transition-colors duration-300 group">
                  <i className="fa-solid fa-check text-gold-500/50 group-hover:text-gold-400 transition-colors duration-300 text-xs"></i>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></span>
              Contact {CONTACT_INFO.name}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="bg-gold-500/10 p-2 rounded-lg border border-gold-500/20 group-hover:bg-gold-500/20 transition-all duration-300">
                  <i className="fa-solid fa-phone text-gold-400"></i>
                </div>
                <div>
                  <span className="text-gray-400 text-xs block mb-1">Phone</span>
                  <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-white font-bold text-lg hover:text-gold-400 transition-colors duration-300">{CONTACT_INFO.phone}</a>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-gold-500/10 p-2 rounded-lg border border-gold-500/20 group-hover:bg-gold-500/20 transition-all duration-300">
                  <i className="fa-solid fa-envelope text-gold-400"></i>
                </div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 hover:text-gold-400 transition-colors duration-300">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-gold-500/10 p-2 rounded-lg border border-gold-500/20 group-hover:bg-gold-500/20 transition-all duration-300">
                  <i className="fa-solid fa-location-dot text-gold-400"></i>
                </div>
                <span className="text-gray-300">{CONTACT_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-400">&copy; 2024 Luxe Living Interiors. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 hover:text-green-300 hover:scale-110 transition-all duration-300"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
            </Link>
            <Link
              href="#"
              className="w-10 h-10 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-full flex items-center justify-center text-pink-400 hover:text-pink-300 hover:scale-110 transition-all duration-300"
            >
              <i className="fa-brands fa-instagram text-lg"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

