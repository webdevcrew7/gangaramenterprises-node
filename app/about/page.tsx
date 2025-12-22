import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CONTACT_INFO } from '@/constants/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Gangaram Enterprises',
    description: 'Learn about Gangaram Enterprises - Crafting beautiful spaces since 2015. Premium home interiors and furniture in Hyderabad.',
};

export default function AboutPage() {
    const values = [
        {
            icon: 'fa-gem',
            title: 'Quality First',
            description: 'We use only premium materials and finest craftsmanship to ensure lasting beauty and durability.',
        },
        {
            icon: 'fa-users',
            title: 'Customer Focus',
            description: 'Every project is tailored to your unique vision with personalized blueprints and dedicated support.',
        },
        {
            icon: 'fa-lightbulb',
            title: 'Innovation',
            description: 'We blend modern design trends with timeless elegance to create spaces that inspire.',
        },
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="page-hero relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-royal-800 via-royal-700 to-royal-600"></div>
                <div className="absolute inset-0 bg-[url('/assets/about-hero.jpg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center px-4 py-20">
                    <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.3em] mb-4 uppercase">
                        Our Story
                    </span>
                    <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        About Us
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-lora">
                        Crafting beautiful spaces since 2015
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Image with Badge */}
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/assets/about-hero.jpg"
                                    alt="Modern interior design"
                                    className="w-full h-[400px] md:h-[500px] object-cover"
                                />
                            </div>
                            {/* Years Badge */}
                            <div className="absolute bottom-6 left-6 bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-4 rounded-lg shadow-lg">
                                <div className="text-royal-800 font-playfair text-3xl font-bold">8+</div>
                                <div className="text-royal-700 text-sm font-medium">Years of Excellence</div>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div>
                            <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">
                                Who We Are
                            </span>
                            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-royal-800 mb-6">
                                Transforming Houses into Homes
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed mb-6">
                                <strong className="text-royal-800">Gangaram Enterprises</strong> is a trusted name in home interiors and furniture solutions, proudly
                                serving Metpalle, Jagtial, and surrounding regions of Telangana. Founded and led by <strong className="text-royal-800">Aravind
                                    Reddy</strong>, we bring a perfect blend of traditional craftsmanship and modern design sensibilities to
                                every project we undertake.
                            </p>
                            <p className="text-gray-600 text-base leading-relaxed mb-8">
                                Our journey began with a simple vision: to make premium interior design accessible to every
                                home. Today, we&apos;ve transformed hundreds of spaces, from cozy apartments to luxurious villas,
                                always maintaining our commitment to quality, innovation, and customer satisfaction.
                            </p>

                            {/* Inline Stats */}
                            <div className="flex flex-wrap gap-8 md:gap-12">
                                <div>
                                    <div className="text-royal-800 font-playfair text-3xl md:text-4xl font-bold">500+</div>
                                    <div className="text-gray-500 text-sm">Happy Clients</div>
                                </div>
                                <div>
                                    <div className="text-royal-800 font-playfair text-3xl md:text-4xl font-bold">1000+</div>
                                    <div className="text-gray-500 text-sm">Projects Completed</div>
                                </div>
                                <div>
                                    <div className="text-royal-800 font-playfair text-3xl md:text-4xl font-bold">100%</div>
                                    <div className="text-gray-500 text-sm">Satisfaction Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">
                            What Drives Us
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-royal-800">
                            Our Values
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="value-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-royal-600 to-royal-700 flex items-center justify-center">
                                    <i className={`fa-solid ${value.icon} text-2xl text-gold-500`}></i>
                                </div>
                                <h3 className="font-playfair text-xl font-bold text-royal-800 mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block text-gold-500 font-cinzel text-sm tracking-[0.2em] mb-4 uppercase">
                            Leadership
                        </span>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-royal-800 mb-8">
                            The Vision Behind Our Success
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Under the visionary leadership of <strong className="text-royal-700">Aravind Reddy</strong>,
                            Gangaram Enterprises has grown from a small workshop to a full-service interior design company.
                            His dedication to excellence and customer satisfaction continues to drive our mission of
                            transforming homes across Telangana.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-500 to-gold-600">
                <div className="container mx-auto text-center">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-royal-800 mb-4">
                        Ready to Transform Your Space?
                    </h2>
                    <p className="text-royal-700 text-lg mb-8 max-w-2xl mx-auto">
                        Let&apos;s bring your vision to life. Get a free consultation today.
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
                            className="inline-flex items-center justify-center gap-3 bg-royal-700 hover:bg-royal-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
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
