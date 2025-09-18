/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        // Puedes añadir fuentes para dar un toque más "vintage"
        // 'serif-custom': ['"Old Standard TT"', 'serif'],
        // 'sans-custom': ['"Roboto Condensed"', 'sans-serif'],
      },
      colors: {
        // Colores base para un estilo vintage
        'parchment': '#FDF5E6',
        'ink': '#2F4F4F',
        'sepia-dark': '#4A3B2F',
        'sepia-light': '#8B7355',
      }
    },
  },
  plugins: [],
}