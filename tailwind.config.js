/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out 3s infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'orb': 'orbMove 20s ease-in-out infinite',
        'orb-reverse': 'orbReverse 25s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        orbMove: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(60px, -40px)' },
          '50%': { transform: 'translate(-40px, 60px)' },
          '75%': { transform: 'translate(40px, 40px)' },
        },
        orbReverse: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-60px, 40px)' },
          '50%': { transform: 'translate(40px, -60px)' },
          '75%': { transform: 'translate(-40px, -40px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
