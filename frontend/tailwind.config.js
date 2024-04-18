/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "retro",
      "business",
      "night",
      "coffee",
      "dim",
      "nord",
      // {
      //   mytheme: {
      //     "primary": "#a991f7",
      //     "secondary": "#f6d860",
      //     "accent": "#37cdbe",
      //     "neutral": "#3d4451",
      //     "base-100": "#ffffff",
      //   }
      // }
    ]
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
}

