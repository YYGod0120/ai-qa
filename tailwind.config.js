/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        'page-bg': '#E6EDFC',
        'default-bg': '#FFFFFFE3',
        'default-font': '#67698D',
        'default-border': '#BFCCF9',
        selected: '#0A7EFF',
        'img-selected': '#0D81FF',
        'bg-selected': '#D1E3FF',
        'main-divider': '#B2D2F08C',
        conversation_font: '#2C2E4D',
      },
      width: {
        aside: '342px',
        main: '1169px',
      },
    },
  },
  plugins: [],
};
