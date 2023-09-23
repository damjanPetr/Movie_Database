/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        fading: " 2000ms ease-in-out 0s 1 fade",
      },
      colors: {
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
        primary: "#FF69b4",
        secondary: "#333333",
        brand: "#243c5a",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography/src/index"),
    require("daisyui"),

    plugin(function ({ addComponents, addUtilities, addVariant }) {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("dirChildren", ["& > *"]);
      addVariant("group-open", [":merge(.group).open &"]);
      addVariant("peer-open", [":merge(.peer).open &"]);
      addUtilities({
        ".fci": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
      });
    }),
  ],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "da-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
