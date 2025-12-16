import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { MobileMenuProvider } from '@/components/MobileMenuProvider';
import { WhatsAppProvider } from '@/components/WhatsAppProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Luxe Living | Home Interiors & Furniture',
  description:
    'Premium Modular Kitchens, Home Theatres, and Custom Furniture by Aravind Reddy. Based in Hyderabad, Telangana.',
  keywords: [
    'home interiors',
    'modular kitchens',
    'home theatre',
    'furniture',
    'Hyderabad',
    'interior design',
  ],
  authors: [{ name: 'Aravind Reddy' }],
  openGraph: {
    title: 'Luxe Living | Home Interiors & Furniture',
    description: 'Where Elegance Meets Comfort',
    type: 'website',
  },
  icons: {
    icon: '/assets/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-gray-50 text-slate-800 antialiased font-sans flex flex-col min-h-screen overflow-x-hidden">
        <CartProvider>
          <MobileMenuProvider>
            <WhatsAppProvider>{children}</WhatsAppProvider>
          </MobileMenuProvider>
        </CartProvider>
      </body>
    </html>
  );
}

