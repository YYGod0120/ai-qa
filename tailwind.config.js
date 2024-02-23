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
        'user-ask': '#E1E6EA',
        'time-font': '#A4A4A4',
        'bg-btns': '#F6F6FD',
        'border-btns': '#E9F2FF',
        'border-popup': '#8D9EB1',
        'bg-popup-confirm': '#1384FF',
        'bg-popup-cancel': '#E1E6EA',
        'bg-history': '#ECF1F6',
        'bg-divider': '#A4A6C1',
      },
      width: {
        aside: '342px',
        main: '1169px',
      },
    },
  },
  plugins: [],
};
