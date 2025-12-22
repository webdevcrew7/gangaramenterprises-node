import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Gangaram Enterprises',
    description: 'Get in touch with Gangaram Enterprises for a free consultation. Call, WhatsApp, or visit us in Hyderabad.',
};

export default function ContactPage() {
    const contactCards = [
        {
            icon: 'fa-phone',
            title: 'Phone',
            value: CONTACT_INFO.phone,
            link: `tel:${CONTACT_INFO.phoneRaw}`,
            subtitle: 'Mon-Sat, 9 AM - 7 PM',
        },
        {
            icon: 'fa-envelope',
            title: 'Email',
            value: CONTACT_INFO.email,
            link: `mailto:${CONTACT_INFO.email}`,
            subtitle: 'We reply within 24 hours',
        },
        {
            icon: 'fa-location-dot',
            title: 'Location',
            value: CONTACT_INFO.location,
            link: 'https://maps.google.com/?q=Metpalle,Jagtial,Telangana',
            subtitle: 'Telangana - 505325',
        },
    ];

    const businessHours = [
        { day: 'Monday - Saturday', time: '9:00 AM - 7:00 PM' },
        { day: 'Sunday', time: 'Closed' },
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="page-hero relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-800 via-royal-700 to-royal-600"></div>
                <div className="absolute inset-0 bg-[url('/assets/contact-hero.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center px-4 py-20">
                    <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.3em] mb-4 uppercase">
                        Get In Touch
                    </span>
                    <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        Contact Us
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-lora">
                        We&apos;d love to hear from you
                    </p>
                </div>
            </section>

            {/* Contact Cards Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-royal-800 mb-4">
                            Reach Out
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Choose your preferred way to connect with us
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {contactCards.map((card, index) => (
                            <Link
                                key={index}
                                href={card.link}
                                target={card.icon === 'fa-location-dot' ? '_blank' : undefined}
                                rel={card.icon === 'fa-location-dot' ? 'noopener noreferrer' : undefined}
                                className="contact-card bg-gray-50 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-royal-600 to-royal-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <i className={`fa-solid ${card.icon} text-2xl text-gold-500`}></i>
                                </div>
                                <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-2">
                                    {card.title}
                                </h3>
                                <p className="font-playfair text-xl font-bold text-royal-800 mb-2">
                                    {card.value}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {card.subtitle}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Action Buttons Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
                        <Link
                            href={CONTACT_INFO.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <i className="fa-brands fa-whatsapp text-2xl"></i>
                            WhatsApp Now
                        </Link>
                        <Link
                            href={`tel:${CONTACT_INFO.phoneRaw}`}
                            className="flex-1 inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-royal-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <i className="fa-solid fa-phone text-xl"></i>
                            Call Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Business Hours & Map Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Business Hours */}
                        <div>
                            <h3 className="font-playfair text-2xl font-bold text-royal-800 mb-6">
                                Business Hours
                            </h3>
                            <div className="space-y-4 mb-8">
                                {businessHours.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-3 border-b border-gray-100"
                                    >
                                        <span className="font-medium text-gray-700">{item.day}</span>
                                        <span className={`font-semibold ${item.time === 'Closed' ? 'text-red-500' : 'text-royal-700'}`}>
                                            {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Free Consultation Box */}
                            <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-6 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-royal-700 flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-gift text-gold-500 text-xl"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-royal-800 text-lg mb-2">
                                            Free Consultation
                                        </h4>
                                        <p className="text-royal-700 text-sm">
                                            Book a free consultation and site visit. Get a tailored quote for your dream home interior project.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div>
                            <h3 className="font-playfair text-2xl font-bold text-royal-800 mb-6">
                                Find Us
                            </h3>
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30336.50376851399!2d78.53453!3d18.3872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba2e897e7c6b3%3A0x8e3c5d0e4d6a8c9f!2sMetpalle%2C%20Telangana!5e0!3m2!1sen!2sin!4v1703267200000!5m2!1sen!2sin"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full"
                                    title="Gangaram Enterprises Location"
                                ></iframe>
                            </div>
                            <p className="text-center text-gray-500 text-sm mt-4">
                                <i className="fa-solid fa-location-dot text-gold-500 mr-2"></i>
                                Metpalle, Jagtial District, Telangana - 505325
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-royal-700 to-royal-600">
                <div className="container mx-auto text-center">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                        Let&apos;s Build Your Dream Space
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Contact us today for a free consultation and let us transform your vision into reality.
                    </p>
                    <Link
                        href={CONTACT_INFO.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-royal-800 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                        Start Your Project
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
