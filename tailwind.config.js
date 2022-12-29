/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeA: {
          bg: '#EEE9D9',
          shadow: '#999999',
          blackFont: '#222222',
        },
        deep: {
          1: '#f8f9fa',
          2: '#e9ecef',
          3: '#dee2e6',
          4: '#ced4da',
          5: '#adb5bd',
          6: '#6c757d',
          7: '#495057',
          8: '#343a40',
          9: '#212529',
        },
      },

      fontFamily: {
        jua: ['var(--font-jua)'],
        black_han_sans: ['var(--font-black_han_sans)'],
        nanum_gothic: ['var(--font-nanum_gothic)'],
        nanum_gothic_coding: ['var(--font-nanum_gothic_coding)'],
      },
    },
  },
  plugins: [],
};
