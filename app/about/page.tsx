import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Gangaram Enterprises – Home Interiors & Furniture',
  description: 'Learn about Gangaram Enterprises - Premium home interiors, furniture, and modular kitchen solutions in Metpalle, Jagtial, Telangana. Led by Aravind Reddy.',
  keywords: 'about Gangaram Enterprises, home interiors company, furniture business Metpalle, Aravind Reddy',
  openGraph: {
    title: 'About Us | Gangaram Enterprises',
    description: 'Learn about Gangaram Enterprises - Premium home interiors, furniture, and modular kitchen solutions in Metpalle, Telangana.',
    url: 'https://gangaramenterprises.in/about',
    images: [
      {
        url: 'https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png',
        width: 1200,
        height: 630,
        alt: 'Gangaram Enterprises About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Gangaram Enterprises',
    description: 'Learn about Gangaram Enterprises - Premium home interiors, furniture, and modular kitchen solutions in Metpalle, Telangana.',
    images: ['https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png'],
  },
  alternates: {
    canonical: 'https://gangaramenterprises.in/about',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Interior Design" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-700/80 to-royal-600/60"></div>
        </div>
        <div className="container mx-auto z-10 text-center text-white px-4 pt-20">
          <span className="text-gold-400 font-medium tracking-wider uppercase text-sm">Our Story</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4">About Us</h1>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">Crafting beautiful spaces since 2015</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop"
                alt="Our Workshop" 
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover" 
              />
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-black p-6 rounded-lg shadow-xl hidden md:block">
                <p className="text-3xl font-bold font-serif">8+</p>
                <p className="text-sm font-medium">Years of Excellence</p>
              </div>
            </div>

            <div>
              <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">Who We Are</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2 mb-6">
                Transforming Houses into Homes
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                <strong>Gangaram Enterprises</strong> is a trusted name in home interiors and furniture
                solutions, proudly serving Metpalle, Jagtial, and surrounding regions of Telangana. Founded and led by
                <strong> Aravind Reddy</strong>, we bring a perfect blend of traditional craftsmanship and modern
                design sensibilities to every project we undertake.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our journey began with a simple vision: to make premium interior design accessible to every
                home. Today, we&apos;ve transformed hundreds of spaces, from cozy apartments to luxurious villas, always
                maintaining our commitment to quality, innovation, and customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold font-serif text-gold-600">500+</p>
                  <p className="text-sm text-slate-500">Happy Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-serif text-gold-600">1000+</p>
                  <p className="text-sm text-slate-500">Projects Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-serif text-gold-600">100%</p>
                  <p className="text-sm text-slate-500">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">Our Values</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="fa-solid fa-gem text-2xl text-gold-600"></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Quality First</h3>
              <p className="text-slate-600 leading-relaxed">
                We use only premium materials and employ skilled craftsmen to ensure every piece meets our high
                standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="fa-solid fa-handshake text-2xl text-gold-600"></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-slate-600 leading-relaxed">
                Your vision is our blueprint. We work closely with you to understand and exceed your
                expectations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
                <i className="fa-solid fa-lightbulb text-2xl text-gold-600"></i>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Innovation</h3>
              <p className="text-slate-600 leading-relaxed">
                We stay updated with the latest trends and technologies to bring you modern, functional designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20 bg-royal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold-400 font-semibold tracking-wider text-sm uppercase">Leadership</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-8">
              Meet Aravind Reddy
            </h2>
            <div className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-gold-500 overflow-hidden">
              <div className="w-full h-full bg-gold-500/20 flex items-center justify-center">
                <i className="fa-solid fa-user text-5xl text-gold-500"></i>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg max-w-2xl mx-auto mb-8">
              With over 8 years of experience in the interior design industry, Aravind Reddy founded Gangaram
              Enterprises with a passion for creating beautiful, functional living spaces. His hands-on approach and attention
              to detail have made the company a trusted name in Telangana.
            </p>
            <a href="tel:+919640044469"
              className="inline-flex items-center gap-2 bg-gold-500 text-black px-8 py-3 rounded font-semibold hover:bg-gold-400 transition-colors">
              <i className="fa-solid fa-phone"></i>
              Connect with Aravind
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-black/80 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your project and bring your vision to life.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-2 bg-royal-700 text-gold-500 px-8 py-3 rounded font-semibold hover:bg-royal-600 transition-colors">
            Get in Touch
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </>
  )
}

