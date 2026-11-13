/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'), // couleur de remplissage (boutons, pastilles)
        signal: token('signal'), // accent lisible en texte sur le fond
        hot: token('hot'),
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        blink: { '50%': { opacity: '0' } },
        rise: {
          from: { opacity: '0', transform: 'translateY(110%) rotate(4deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '80%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        blink: 'blink 1s steps(1) infinite',
        rise: 'rise 0.9s cubic-bezier(.2,.8,.2,1) both',
        'fade-up': 'fadeUp 0.7s cubic-bezier(.2,.8,.2,1) both',
        'scroll-dot': 'scrollDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
