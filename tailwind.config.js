/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
        signika: ['Signika', 'sans-serif'],
        sarpanch: ['Sarpanch', 'sans-serif'],
        pinyon: ['Pinyon Script', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
