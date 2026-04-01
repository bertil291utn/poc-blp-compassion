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
          blue: '#0077C8',
          'blue-light': '#E3F2FD',
          'blue-dark': '#005A96',
        },
        letter: {
          received: '#0077C8',
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

