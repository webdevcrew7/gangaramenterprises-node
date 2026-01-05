# Gangaram Enterprises - Next.js Website

A modern, production-ready Next.js website for Gangaram Enterprises, a premium home interiors and furniture business based in Hyderabad, Telangana.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- ⚡ **Performance Optimized** - Next.js Image optimization, code splitting, and production builds
- 📱 **Mobile First** - Fully responsive design with mobile menu and drawer components
- 🛒 **Shopping Cart** - Add products to inquiry list and request quotes via WhatsApp
- 🎯 **SEO Optimized** - Meta tags, semantic HTML, and optimized fonts
- 🔧 **TypeScript** - Full type safety throughout the application
- 🎭 **Component Based** - Modular, reusable React components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6
- **Fonts**: Inter (body), Playfair Display (headings)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── ServicesStrip.tsx   # Services showcase
│   ├── Collections.tsx     # Product collections
│   ├── Footer.tsx          # Footer section
│   ├── ProductCard.tsx     # Product card component
│   ├── MobileMenu.tsx      # Mobile menu drawer
│   ├── CartDrawer.tsx      # Shopping cart drawer
│   ├── Toast.tsx           # Toast notifications
│   ├── WhatsAppButton.tsx  # Floating WhatsApp button
│   ├── CartProvider.tsx   # Cart context provider
│   └── MobileMenuProvider.tsx # Mobile menu context provider
├── constants/
│   ├── products.ts         # Product data
│   └── contact.ts          # Contact information
├── hooks/
│   ├── useProductFilter.ts # Product filtering hook
│   └── useToast.ts         # Toast notification hook
├── types/
│   └── index.ts            # TypeScript type definitions
└── utils/
    ├── category.ts          # Category utilities
    └── cart.ts              # Cart utilities
```

## Key Features

### Component Architecture
- Modular, reusable components
- Context providers for shared state (Cart, Mobile Menu)
- Custom hooks for business logic
- Type-safe with TypeScript

### Performance Optimizations
- Next.js Image component for optimized images
- Code splitting and lazy loading
- Font optimization with next/font
- Production build optimizations

### SEO & Accessibility
- Semantic HTML structure
- Meta tags and Open Graph
- ARIA labels for interactive elements
- Responsive design

## Customization

### Update Contact Information
Edit `constants/contact.ts` to update contact details.

### Add/Modify Products
Edit `constants/products.ts` to manage product catalog.

### Styling
- Tailwind configuration: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Component styles: Inline Tailwind classes

## Production Deployment

The site is optimized for production with:
- Console log removal in production builds
- Image optimization and lazy loading
- Code minification
- Optimized font loading

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## License

© 2024 Gangaram Enterprises Interiors. All rights reserved.

