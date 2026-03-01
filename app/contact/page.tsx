import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Gangaram Enterprises',
  description: 'Contact Gangaram Enterprises for home interiors, furniture, and modular kitchens in Metpalle, Jagtial, Telangana. Call Aravind Reddy.',
  keywords: 'contact Gangaram Enterprises, home interiors contact, furniture contact Metpalle, Aravind Reddy contact',
  openGraph: {
    title: 'Contact Us | Gangaram Enterprises',
    description: 'Contact Gangaram Enterprises for home interiors, furniture, and modular kitchens in Metpalle, Telangana.',
    url: 'https://gangaramenterprises.in/contact',
    images: [
      {
        url: 'https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png',
        width: 1200,
        height: 630,
        alt: 'Gangaram Enterprises Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Gangaram Enterprises',
    description: 'Contact Gangaram Enterprises for home interiors, furniture, and modular kitchens in Metpalle, Telangana.',
    images: ['https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png'],
  },
  alternates: {
    canonical: 'https://gangaramenterprises.in/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-700/80 to-royal-600/60"></div>
        </div>
        <div className="container mx-auto z-10 text-center text-white px-4 pt-20">
          <span className="text-gold-400 font-medium tracking-wider uppercase text-sm">Get In Touch</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4">Contact Us</h1>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">We&apos;d love to hear from you</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <span className="text-gold-600 font-semibold tracking-wider text-sm uppercase">Reach Out</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mt-2 mb-6">Let&apos;s Bring Your Vision to Life</h2>
              <p className="text-slate-600 mb-8 text-lg">Whether you are looking to redesign a single room or transform your entire home, our expert team is here to help. Reach out to schedule your complimentary consultation and take the first step toward your dream interior.</p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-phone text-gold-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:+919640044469"
                      className="text-gold-600 text-xl font-bold hover:text-gold-500">+91 96400 44469</a>
                    <p className="text-slate-500 text-sm mt-1">Mon-Sat, 9AM-7PM</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-brands fa-whatsapp text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                    <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer"
                      className="text-green-600 text-xl font-bold hover:text-green-500">+91 96400 44469</a>
                    <p className="text-slate-500 text-sm mt-1">Quick responses guaranteed</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-envelope text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:aravindreddysoma@gmail.com"
                      className="text-blue-600 font-medium hover:text-blue-500">aravindreddysoma@gmail.com</a>
                    <p className="text-slate-500 text-sm mt-1">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-location-dot text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-slate-700 font-medium">Metpalle</p>
                    <p className="text-slate-500 text-sm">District: Jagtial, Telangana - 505325</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="https://wa.me/919640044469" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded font-semibold hover:bg-green-600 transition-colors">
                  <i className="fa-brands fa-whatsapp text-xl"></i>WhatsApp Now
                </a>
                <a href="tel:+919640044469"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 text-black px-6 py-3 rounded font-semibold hover:bg-gold-400 transition-colors">
                  <i className="fa-solid fa-phone"></i>Call Now
                </a>
              </div>
            </div>

            {/* Map & Hours */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15165.844!2d78.92!3d18.80!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccebd9e6f6b3b7%3A0x9e7c3ba2b4b3b3b!2sMetpalle%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-clock text-gold-500"></i>
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-slate-600">Monday - Saturday</span>
                    <span className="font-semibold text-slate-800">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Sunday</span>
                    <span className="font-semibold text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Note */}
              <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-lightbulb text-gold-600"></i>
                  Free Consultation
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">Book a personalized consultation and professional site visit. Our interior experts will carefully assess your space, understand your lifestyle requirements, and provide a comprehensive, tailored proposal that perfectly aligns with your aesthetic preferences and budget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

