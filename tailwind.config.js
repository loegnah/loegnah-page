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
    },
  },
  plugins: [],
};
