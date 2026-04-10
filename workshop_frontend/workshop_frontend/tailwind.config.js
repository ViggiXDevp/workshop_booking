/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        primary: { 50:"#eef2ff", 100:"#e0e7ff", 500:"#4f46e5", 600:"#4338ca", 700:"#3730a3" },
        accent: "#f97316",
      },
      boxShadow: { card: "0 4px 16px rgba(0,0,0,0.07)" },
    },
  },
  plugins: [],
};
