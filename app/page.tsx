import HeroSection from '@/components/HeroSection'
import MobileCategoryStrip from '@/components/MobileCategoryStrip'
import ServicesStrip from '@/components/ServicesStrip'
import CollectionsSection from '@/components/CollectionsSection'
import TestimonialSection from '@/components/TestimonialSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gangaram  – Home Interiors, Furniture & Modular Kitchens',
  description: 'Discover premium home interiors, modular kitchens, furniture, and home theatre solutions at Gangaram Enterprises in Metpalle, Telangana. Custom designs and expert installation.',
  keywords: 'home interiors, modular kitchens, furniture, home theatre, Metpalle, Telangana, Gangaram Enterprises',
  openGraph: {
    title: 'Gangaram Enterprises – Home Interiors & Furniture',
    description: 'Premium home interiors, modular kitchens, furniture and decor services in Metpalle, Telangana.',
    url: 'https://gangaramenterprises.in',
    images: [
      {
        url: 'https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png',
        width: 1200,
        height: 630,
        alt: 'Gangaram Enterprises Home',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gangaram Enterprises – Home Interiors & Furniture',
    description: 'Premium home interiors, modular kitchens, furniture and decor services in Metpalle, Telangana.',
    images: ['https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png'],
  },
  alternates: {
    canonical: 'https://gangaramenterprises.in',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <MobileCategoryStrip />
      <ServicesStrip />
      <CollectionsSection />
      <TestimonialSection />
    </>
  )
}

