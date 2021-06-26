module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          color: "#c98860",
          color1: "#c08552",
          color2: "#94d2bd",
          color3: "#ee9b00",
          color4: "#faedcd",
          color5: "#5e2618",
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
