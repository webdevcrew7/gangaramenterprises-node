import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MobileCategoryStrip from '@/components/MobileCategoryStrip';
import ServicesStrip from '@/components/ServicesStrip';
import Collections from '@/components/Collections';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MobileCategoryStrip />
      <ServicesStrip />
      <Collections />
      <Footer />
    </>
  );
}
