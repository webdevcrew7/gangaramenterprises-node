'use client'

import FlashSaleCarousel from './FlashSaleCarousel'
import MobileSaleBanner from './MobileSaleBanner'
import DesktopBannerCarousel from './DesktopBannerCarousel'
import AnnouncementBar from './AnnouncementBar'

export default function HeroSection() {
  return (
    <section id="home" className="relative flex flex-col overflow-hidden w-full hero-gradient-section">
      <div className="absolute inset-0 z-0 w-full hero-gradient"></div>

      {/* Desktop Banner Carousel */}
      <DesktopBannerCarousel />

      {/* Mobile Banner Carousel */}
      <MobileSaleBanner />

      {/* Announcement Marquee - positioned at bottom of hero, desktop only */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 z-20">
        <AnnouncementBar />
      </div>
    </section>
  )
}