import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/constants/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Gangaram Enterprises',
    description: 'Explore our comprehensive home transformation services - Modular Kitchens, Home Theatres, Custom Furniture, and more.',
};

export default function ServicesPage() {
    const services = [
        {
            title: 'Modular Kitchens',
            price: '₹49,999',
            image: '/assets/kitchen.jpg',
            features: ['Premium finishes', 'Soft-close drawers', '5-year warranty'],
            description: 'Transform your kitchen into a modern, functional space with our custom modular designs.',
        },
        {
            title: 'Home Theatre',
            price: '₹89,999',
            image: '/assets/theatre.jpg',
            features: ['Acoustic treatment', 'Professional sound', 'Luxury seating'],
            description: 'Create the ultimate cinematic experience right in your home.',
        },
        {
            title: 'Custom Furniture',
            price: '₹24,999',
            image: '/assets/furniture.jpg',
            features: ['Handcrafted sofas', 'Designer beds', 'Dining sets'],
            description: 'Bespoke furniture pieces crafted to match your style and space.',
        },
        {
            title: 'Curtains & Blinds',
            price: 'Custom Quote',
            image: '/assets/curtains.jpg',
            features: ['Automated systems', 'Luxury fabrics', 'Thermal insulation'],
            description: 'Elegant window treatments that complement your interiors perfectly.',
        },
        {
            title: 'Home Interiors',
            price: 'Custom Quote',
            image: '/assets/interiors.jpg',
            features: ['Total home makeover', '3D planning', 'Expert consultation'],
            description: 'Complete interior solutions from concept to execution.',
        },
        {
            title: 'More Services',
            price: 'Custom Quote',
            image: '/assets/more-services.jpg',
            features: ['UPVC Windows', 'Glass Railings', 'Colors & Painting'],
            description: 'Additional services to complete your home transformation.',
        },
    ];

    const process = [
        {
            step: '01',
            title: 'Consultation',
            description: 'Free consultation to understand your vision, requirements, and budget.',
            icon: 'fa-comments',
        },
        {
            step: '02',
            title: 'Design',
            description: 'Custom designs and 3D visualizations for your approval.',
            icon: 'fa-pencil-ruler',
        },
        {
            step: '03',
            title: 'Production',
            description: 'Crafting with premium materials and rigorous quality checks.',
            icon: 'fa-hammer',
        },
        {
            step: '04',
            title: 'Installation',
            description: 'Professional installation and final handover with complete support.',
            icon: 'fa-check-circle',
        },
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="page-hero relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-800 via-royal-700 to-royal-600"></div>
                <div className="absolute inset-0 bg-[url('/assets/services-hero.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center px-4 py-20">
                    <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.3em] mb-4 uppercase">
                        What We Offer
                    </span>
                    <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        Our Services
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-lora">
                        Complete home transformation solutions
                    </p>
                </div>
            </section>

            {/* Services Intro */}
            <section className="py-12 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="font-cinzel text-sm tracking-[0.2em] text-gold-500 uppercase mb-2">
                        Comprehensive Solutions
                    </h2>
                    <p className="text-2xl md:text-3xl font-playfair text-royal-800 font-semibold">
                        Everything Your Home Needs
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="inline-block bg-gold-500 text-royal-800 text-sm font-bold px-3 py-1 rounded-full">
                                            Starting {service.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-playfair text-xl font-bold text-royal-800 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                <i className="fa-solid fa-check text-green-500 text-xs"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`${CONTACT_INFO.whatsapp}?text=Hi, I'm interested in ${service.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full gap-2 bg-royal-700 hover:bg-royal-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                                    >
                                        <i className="fa-brands fa-whatsapp"></i>
                                        Get a Free Quote
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">
                            Our Process
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-royal-800">
                            How We Work
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {process.map((step, index) => (
                            <div key={index} className="process-step text-center relative">
                                {/* Connector Line (hidden on mobile and last item) */}
                                {index < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold-500 to-gold-400"></div>
                                )}

                                {/* Step Circle */}
                                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-royal-600 to-royal-700 flex items-center justify-center shadow-lg">
                                    <i className={`fa-solid ${step.icon} text-2xl text-gold-500`}></i>
                                </div>

                                {/* Step Number */}
                                <div className="text-gold-500 font-bold text-sm mb-2">{step.step}</div>

                                {/* Title */}
                                <h3 className="font-playfair text-xl font-bold text-royal-800 mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-royal-700 to-royal-600">
                <div className="container mx-auto text-center">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Get a free consultation and quote today. Let&apos;s create something amazing together.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href={CONTACT_INFO.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <i className="fa-brands fa-whatsapp text-xl"></i>
                            WhatsApp Us
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-royal-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <i className="fa-solid fa-envelope text-lg"></i>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
