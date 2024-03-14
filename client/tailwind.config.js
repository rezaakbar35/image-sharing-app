/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors:{
      'primary': '#7469B6',
      'secondary': '#A1A1D8',
      'white' : colors.white,
      'black' : colors.black,
      'gray' : colors.gray,
      'red' : colors.red,
      'orange' : colors.orange,
      'yellow' : colors.yellow,
      'green' : colors.green,
      'blue' : colors.blue,
      'indigo' : colors.indigo,
      'purple' : colors.purple,
      'pink' : colors.pink,
      'amber' : colors.amber,
      'lime' : colors.lime,
      'cyan' : colors.cyan,
      'slate' : colors.slate
    },
  },
  plugins: [],
};
