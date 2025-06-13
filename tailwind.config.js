/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#556B2F',
        secondary: '#8B4513',
        accent: '#C2B280',
        background: '#FAF8F0',
        text: '#212121',
      },
      fontFamily: {
        en: ['var(--font-en)'],
        hi: ['var(--font-hi)'],
        gu: ['var(--font-gu)'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease forwards',
        scaleIn: 'scaleIn 0.5s ease forwards',
        slideUp: 'slideUp 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 