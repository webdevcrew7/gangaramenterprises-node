import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Gangaram Enterprises',
  description: 'Explore our services - Modular Kitchens, Home Interiors, Home Theatre, Furniture at Gangaram Enterprises.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2000&auto=format&fit=crop"
            alt="Services" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-700/80 to-royal-600/60"></div>
        </div>
        <div className="container mx-auto z-10 text-center text-white px-4 pt-20">
          <span className="text-gold-400 font-medium tracking-wider uppercase text-sm">What We Offer</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4">Our Services</h1>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">Complete home transformation solutions</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">Comprehensive Solutions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2">Everything Your Home Needs</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Modular Kitchen */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/Interiors/Design1.webp" 
                  alt="Modular Kitchen"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">Modular Kitchen</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">Custom-designed modular kitchens with premium finish,
                  soft-close mechanisms, and smart storage.</p>
                <p className="text-gold-600 font-bold text-lg">Starting ₹49,999</p>
              </div>
            </div>

            {/* Home Theatre */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/Home Theatre/HT1.webp" 
                  alt="Home Theatre"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">Home Theatre</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">Complete home theatre setups with 4K projectors, Dolby
                  Atmos sound, and acoustic treatment.</p>
                <p className="text-gold-600 font-bold text-lg">Starting ₹89,999</p>
              </div>
            </div>

            {/* Furniture */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/Furniture/sofa1.webp" 
                  alt="Furniture"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">Premium Furniture</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">Handcrafted sofas, beds, dining tables. Quality
                  craftsmanship that lasts generations.</p>
                <p className="text-gold-600 font-bold text-lg">Starting ₹24,999</p>
              </div>
            </div>

            {/* Curtains */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="/assets/Curtains/Curtain1.webp" 
                  alt="Curtains"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">Curtains & Blinds</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">Designer curtains, roller blinds, and motorized options
                  for the perfect finishing touch.</p>
                <p className="text-gold-600 font-bold text-lg">Custom Quotes</p>
              </div>
            </div>

            {/* Home Interiors */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800"
                  alt="Interiors"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">Home Interiors</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">Complete interior design for living rooms, bedrooms, and
                  false ceiling (POP/Gypsum).</p>
                <p className="text-gold-600 font-bold text-lg">Custom Quotes</p>
              </div>
            </div>

            {/* Additional */}
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800"
                  alt="More Services"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-serif text-xl font-bold text-white">More Services</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">UPVC Windows, Glass Railings, Colors & Painting -
                  complete home solutions.</p>
                <p className="text-gold-600 font-bold text-lg">Custom Quotes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">How We Work</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2">Our Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Consultation</h3>
              <p className="text-slate-600 text-sm">Free consultation to understand your vision</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Design</h3>
              <p className="text-slate-600 text-sm">Custom designs and 3D visualizations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Production</h3>
              <p className="text-slate-600 text-sm">Crafting with premium materials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold-500 text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Installation</h3>
              <p className="text-slate-600 text-sm">Professional installation and handover</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-royal-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8">Get a free consultation and quote today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded font-semibold hover:bg-green-600">
              <i className="fa-brands fa-whatsapp text-xl"></i>WhatsApp Us
            </a>
            <a href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 text-black px-8 py-3 rounded font-semibold hover:bg-gold-400">
              <i className="fa-solid fa-envelope"></i>Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

