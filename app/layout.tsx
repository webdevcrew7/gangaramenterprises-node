import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cinzel, Lora } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { MobileMenuProvider } from '@/components/MobileMenuProvider';
import { ToastProvider } from '@/components/ToastProvider';
import FloatingCallButton from '@/components/FloatingCallButton';
import MobileBottomNav from '@/components/MobileBottomNav';
import MobileMenu from '@/components/MobileMenu';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';

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

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '700'],
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Gangaram Enterprises | Home Interiors & Furniture',
  description:
    'Premium Modular Kitchens, Home Theatres, and Custom Furniture. Based in Hyderabad, Telangana.',
  keywords: [
    'home interiors',
    'modular kitchens',
    'home theatre',
    'furniture',
    'Hyderabad',
    'interior design',
    'gangaram enterprises',
  ],
  authors: [{ name: 'Gangaram Enterprises' }],
  openGraph: {
    title: 'Gangaram Enterprises | Home Interiors & Furniture',
    description: 'We Design for your Comfort',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${lora.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-gray-50 text-slate-800 antialiased font-sans flex flex-col min-h-screen overflow-x-hidden">
        <CartProvider>
          <MobileMenuProvider>
            <ToastProvider>
              {children}
              {/* Common components for all pages */}
              <MobileMenu />
              <CartDrawer />
              <Toast />
              <FloatingCallButton />
              <MobileBottomNav />
            </ToastProvider>
          </MobileMenuProvider>
        </CartProvider>
      </body>
    </html>
  );
}

