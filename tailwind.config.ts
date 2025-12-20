import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        lora: ['var(--font-lora)', 'serif'],
      },
      colors: {
        royal: {
          50: '#e8f0f8',
          100: '#d1e1f1',
          200: '#a8c8e8',
          300: '#7aaddb',
          400: '#4a8ecd',
          500: '#2d5a94',
          600: '#264b7a',
          700: '#1e3a5f',
          800: '#162c47',
          900: '#0f1f30',
        },
        gold: {
          400: '#fbbf24',
          500: '#c5a059',
          600: '#b08d55',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'scroll-announcement': 'scrollAnnouncement 25s linear infinite',
        'sale-flash': 'saleFlash 1.5s ease-in-out infinite',
        'sale-pulse': 'salePulse 1.5s ease-in-out infinite',
        'float-bounce': 'floatBounce 3s ease-in-out infinite',
        'fall-sway': 'fallAndSway 4s ease-in-out infinite',
      },
      keyframes: {
        scrollAnnouncement: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        saleFlash: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        salePulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.4)' },
        },
        floatBounce: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(10deg)' },
        },
        fallAndSway: {
          '0%': { top: '-20px', transform: 'rotate(45deg) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '50%': { transform: 'rotate(45deg) translateX(30px)' },
          '100%': { top: '100%', transform: 'rotate(405deg) translateX(-30px)', opacity: '0' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 20px 60px -15px rgba(0, 0, 0, 0.3)',
        'premium-lg': '0 25px 80px -20px rgba(0, 0, 0, 0.4)',
        'gold': '0 10px 40px -10px rgba(197, 160, 89, 0.4)',
      },
    },
  },
  plugins: [],
}
export default config

