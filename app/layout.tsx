import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import FloatingContactButtons from '@/components/FloatingContactButtons'
import CartDrawer from '@/components/CartDrawer'
import Toast from '@/components/Toast'
import { CartProvider } from '@/contexts/CartContext'
import { CategoryProvider } from '@/contexts/CategoryContext'
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Gangaram Enterprises – Home Interiors, Furniture & Modular Kitchens in Metpalle, Telangana',
  description: 'Gangaram Enterprises provides home interior design, modular kitchen solutions and premium furniture in Metpalle, Jagtial, Telangana. Contact us for custom designs and installation.',
  keywords: 'home interiors, modular kitchens, furniture, home theatre, Metpalle, Telangana',
  authors: [{ name: 'Aravind Reddy', url: 'https://gangaramenterprises.in' }],
  icons: {
    icon: '/favicon.ico',              // browser tab
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',    // iOS
  },
  openGraph: {
    title: 'Gangaram Enterprises – Home Interiors & Furniture',
    description: 'Premium home interiors, modular kitchens, furniture and decor services in Metpalle, Telangana.',
    type: 'website',
    url: 'https://gangaramenterprises.in',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="canonical" href="https://gangaramenterprises.in/" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3SH2V7HNTR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3SH2V7HNTR');
          `}
        </Script>


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Gangaram Enterprises",
              "url": "https://gangaramenterprises.in",
              "telephone": "+919640044469",
              "email": "aravindreddysoma@gmail.com",
              "logo": "https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png",
              "image": "https://gangaramenterprises.in/assets/gangaram-enterprises-logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Metpalle",
                "addressLocality": "Metpalle",
                "addressRegion": "Telangana",
                "postalCode": "505325",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.8,
                "longitude": 78.92
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              ],
              "description": "Gangaram Enterprises — Premium home interiors, modular kitchens, furniture and decor services in Metpalle, Telangana.",
              "service": [
                {
                  "@type": "Service",
                  "name": "Home Interiors",
                  "description": "Customized home interior design services including living room, bedroom, kitchen and office interiors."
                },
                {
                  "@type": "Service",
                  "name": "Modular Kitchen Design",
                  "description": "Design and installation of modular kitchens tailored to your space and style."
                },
                {
                  "@type": "Service",
                  "name": "Furniture Solutions",
                  "description": "Modern and custom furniture for living room, bedroom, office and other spaces."
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-gray-50 text-slate-800 antialiased font-sans flex flex-col min-h-screen overflow-x-hidden`}>
        <CartProvider>
          <CategoryProvider>
            <>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <MobileBottomNav />
              <FloatingContactButtons />
              <CartDrawer />
              <Toast />
            </>
          </CategoryProvider>
        </CartProvider>
      </body>
    </html>
  )
}

