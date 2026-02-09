/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        altea: {
          dark: '#111111',
          cardDark: '#1A1A1A',
          green: '#2ECC71',
          greenDark: '#27AE60',
          textLight: '#F5F5F5',
          textMuted: '#A3A3A3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
