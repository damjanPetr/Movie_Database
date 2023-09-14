/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
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
        "waving-hand": "wave 2s linear infinite",
        fading: "fade 1s linear 0.1s",
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
        primary: "#FF69b4", // Can always use CSS variables too e.g. "var(--color-primary)",
        secondary: "#333333",
        brand: "#243c5a",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography/src/index"),
    require("daisyui"),

    plugin(function ({ addVariant, addComponents }) {
      addComponents({
        ".button": { padding: "0.5rem 1rem" },
      });

      addVariant("optional", "&:optional");

      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("dirChildren", ["& > *"]);
      addVariant("group-open", [":merge(.group).open &"]);
      addVariant("peer-open", [":merge(.peer).open &"]);
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
