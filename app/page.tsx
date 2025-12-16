import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesStrip from '@/components/ServicesStrip';
import Collections from '@/components/Collections';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';
import WhatsAppToggle from '@/components/WhatsAppToggle';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesStrip />
      <Collections />
      <Footer />
      <MobileMenu />
      <CartDrawer />
      <Toast />
      <WhatsAppToggle />
    </>
  );
}

