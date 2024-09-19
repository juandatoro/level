/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        lighter: '#F2F3F7',
        obscure: '#071849',
        row: '#FCFCFD',
        secondary: '#030303',
        drawer: '#BFBDBD',
      },
      screens: {
        xs: '360px',
        ...defaultTheme.screens,
        '3xl': '1650px',
      },
    },
  },
  plugins: [],
}
