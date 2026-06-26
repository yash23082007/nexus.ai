/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        arctic:    '#F1F6F4',
        mint:      '#D9E8E2',
        forsythia: '#FFC801',
        saffron:   '#FF9932',
        nocturnal: '#114C5A',
        oceanic:   '#172B36',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.4s ease-out forwards',
        'fade-in':    'fadeIn 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.35s ease-in-out forwards',
        'price-flip': 'priceFlip 0.2s ease-out forwards',
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideDown: { from: { maxHeight: 0, opacity: 0 }, to: { maxHeight: '600px', opacity: 1 } },
        priceFlip: { '0%': { opacity: 0, transform: 'translateY(-8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      screens: {
        sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
