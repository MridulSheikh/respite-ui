/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      poppine: ["Poppins", "cursive"],
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animated")],
};
