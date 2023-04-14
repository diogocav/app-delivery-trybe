/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: '#D3D3D3',
        black: '#000000',
        darkYellow: '#FAA61A',
        lightYellow: '#FADC8C',
        red: '#FF0000',
        white: '#FFFFFF',
      },
      textDecoration: ['active'],
    },
  },
  plugins: [],
};
