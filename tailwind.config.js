/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory:    '#FAF7F0',
        sand:     '#E4D9C4',
        stone:    '#A9A196',
        charcoal: '#2B2A28',
        ink:      '#141312',
        bronze:   '#B08D57',
        bronzeLight: '#D4B483',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(2.5rem, 6vw, 5.5rem)',
        h1: 'clamp(2rem, 4vw, 3.5rem)',
        h2: 'clamp(1.5rem, 3vw, 2.25rem)',
        body: '1rem',
        small: '0.875rem',
      },
      spacing: {
        'desktop-rhythm': '120px',
        'tablet-rhythm': '80px',
        'mobile-rhythm': '56px',
      },
      screens: {
        sm: '390px',
        md: '768px',
        lg: '1024px',
        xl: '1440px'
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      }
    },
  },
  plugins: [],
}
