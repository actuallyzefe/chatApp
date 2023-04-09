/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      '250': '250px',
    },
    extend: {
      boxShadow: {
        "leftbar" : "0 0 24px 0 rgba(0, 0, 0, 0.1)",
        "messages" : "1px 0 0 0 rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        "98" : "98%",
      }
    },
  },
  plugins: [],
}