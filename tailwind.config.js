/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Zanmi brand palette — keeping legacy class names so existing components don't break
        zpurple: '#7C3AED',          // Zanmi Purple
        zblue: '#14B8A6',            // Zanmi Teal  (was blue)
        zyellow: '#F97316',          // Zanmi Orange (was yellow)
        zdark: '#0B1F3A',            // Zanmi Navy   (was dark)
        zbg: '#F8FAFC',              // Zanmi Light background
        'zpurple-dark': '#6D28D9',   // Darker purple
        'zblue-dark': '#0D9488',     // Darker teal
        // Semantic aliases
        znavy: '#0B1F3A',
        zteal: '#14B8A6',
        zorange: '#F97316',
        'zteal-dark': '#0D9488',
        'zorange-dark': '#EA580C',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out',
        'confetti': 'confetti 1s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'bar-grow': 'barGrow 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        barGrow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'game': '0 8px 0 rgba(0,0,0,0.15)',
        'game-sm': '0 4px 0 rgba(0,0,0,0.12)',
        'card': '0 2px 16px rgba(11,31,58,0.07)',
        'card-hover': '0 6px 24px rgba(11,31,58,0.12)',
        'elevated': '0 8px 40px rgba(11,31,58,0.10)',
      },
    },
  },
  plugins: [],
};
