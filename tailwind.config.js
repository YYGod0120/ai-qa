/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        'default-bg': '#f5f5f5',
        selected: '#4096ff',
        'default-border': '#f0f0f0',
      },
    },
  },
  plugins: [],
};
