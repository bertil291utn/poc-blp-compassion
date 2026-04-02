/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Escala de grises Luma — neutros puros OKLCH, sin tinte azul/cálido
        gray: {
          50:  'oklch(0.985 0 0)',
          100: 'oklch(0.97 0 0)',
          200: 'oklch(0.922 0 0)',
          300: 'oklch(0.869 0 0)',
          400: 'oklch(0.708 0 0)',
          500: 'oklch(0.556 0 0)',
          600: 'oklch(0.45 0 0)',
          700: 'oklch(0.37 0 0)',
          800: 'oklch(0.274 0 0)',
          900: 'oklch(0.205 0 0)',
          950: 'oklch(0.145 0 0)',
        },
        // Azul Compassion — se mantiene igual
        compassion: {
          blue:        '#1f5eb8',
          'blue-light': '#EBF2FB',
          'blue-dark':  '#174a96',
        },
        letter: {
          received: '#1f5eb8',
          draft:    'oklch(0.556 0 0)',
          sent:     'oklch(0.452 0.142 145)',
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm:    '0.375rem',
        DEFAULT: '0.5rem',
        md:    '0.5rem',
        lg:    '0.625rem',
        xl:    '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.375rem',
        full:  '9999px',
      },
      boxShadow: {
        sm:      '0 1px 2px oklch(0 0 0 / 0.04)',
        DEFAULT: '0 1px 3px oklch(0 0 0 / 0.06), 0 1px 2px oklch(0 0 0 / 0.03)',
        md:      '0 4px 8px oklch(0 0 0 / 0.05), 0 2px 4px oklch(0 0 0 / 0.04)',
        lg:      '0 8px 16px oklch(0 0 0 / 0.06), 0 4px 6px oklch(0 0 0 / 0.04)',
        xl:      '0 16px 32px oklch(0 0 0 / 0.07)',
        none:    'none',
      },
    },
  },
  plugins: [],
}
