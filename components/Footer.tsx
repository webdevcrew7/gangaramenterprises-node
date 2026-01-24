import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-royal-800 text-gray-300 py-12 border-t border-royal-600 w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image
                src="/assets/new-logo.png"
                alt="Gangaram Enterprises Logo"
                width={180}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm">
              Home Interiors & Furniture based in Metpalle. <br />We design for
              your comfort.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-gold-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gold-500 transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Aravind Reddy</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-phone mt-1 text-gold-500"></i>
                <span className="text-white font-bold text-lg">96400 44469</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-gold-500"></i>
                <span>aravindreddysoma@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-location-dot text-gold-500"></i>
                <span>Metpalle, Dist:Jagtial, Telangana, 505325</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-xs">
          <p>&copy; 2024 Gangaram Enterprises. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp text-lg hover:text-green-500 cursor-pointer"></i>
            </a>
            <a href="https://www.instagram.com/gangaram_enterprises?igsh=MTZtbDFpbWRoZzlpeg==" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram text-lg hover:text-pink-500 cursor-pointer"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

