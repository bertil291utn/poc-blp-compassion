/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        compassion: {
          blue: '#1f5eb8',
          'blue-light': '#EBF2FB',
          'blue-dark': '#174a96',
        },
        letter: {
          received: '#1f5eb8',
          draft: '#9E9E9E',
          sent: '#2E7D32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

