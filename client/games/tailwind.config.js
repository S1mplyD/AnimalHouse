/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      "1/4": "25%",
    },
    maxWidth: {
      "08": "80%",
    },
    maxHeight: {
      "08": "80%",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
