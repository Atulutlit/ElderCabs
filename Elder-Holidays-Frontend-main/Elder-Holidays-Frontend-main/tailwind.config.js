/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["'Inter'", 'sans-serif']
      }
    },
  },
  plugins: [require('tw-elements/dist/plugin'),require('tailwind-scrollbar-hide')],
}