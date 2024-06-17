/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          100: "#e7d6ea",
          200: "#ceacd5",
          300: "#b683bf",
          400: "#9d59aa",
          500: "#853095",
          600: "#6a2677",
          700: "#501d59",
          800: "#35133c",
          900: "#1b0a1e"
        },
      }
    },
  },
  plugins: [],
}