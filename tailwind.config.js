/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black:   '#080D1A',
          navy:    '#0D1525',
          surface: '#111827',
          card:    '#151E2E',
          border:  '#1E2D45',
          muted:   '#64748B',
          text:    '#CBD5E1',
          amber:   '#F59E0B',
          'amber-light': '#FCD34D',
          'amber-dim':   '#92600A',
          emerald: '#10B981',
          'emerald-light': '#34D399',
          'emerald-dim':   '#065F46',
        }
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':    'spin 8s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-amber':   'glowAmber 2s ease-in-out infinite alternate',
        'glow-emerald': 'glowEmerald 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowAmber: {
          from: { boxShadow: '0 0 20px rgba(245,158,11,0.3)' },
          to:   { boxShadow: '0 0 60px rgba(245,158,11,0.6)' },
        },
        glowEmerald: {
          from: { boxShadow: '0 0 20px rgba(16,185,129,0.3)' },
          to:   { boxShadow: '0 0 60px rgba(16,185,129,0.6)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E2D45' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
