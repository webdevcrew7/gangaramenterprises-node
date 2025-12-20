import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MobileCategoryStrip from '@/components/MobileCategoryStrip';
import ServicesStrip from '@/components/ServicesStrip';
import Collections from '@/components/Collections';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';
import WhatsAppToggle from '@/components/WhatsAppToggle';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MobileCategoryStrip />
      <ServicesStrip />
      <Collections />
      <Footer />
      <MobileMenu />
      <CartDrawer />
      <Toast />
      <WhatsAppToggle />
      <MobileBottomNav />
    </>
  );
}
