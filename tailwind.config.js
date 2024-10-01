/** @type {import('tailwindcss').Config} */
export default {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    './src/components/**/*.{html,js}',
    './src/pages/**/*.{html,js}',
    './index.html',
  ],
  // content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

