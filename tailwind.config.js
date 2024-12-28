/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        orangeGold: "#FF8C00",
        darkGray: "#1a1a1d",
        mediumGray: "#4e4e50",
      },
    },
  },
}

