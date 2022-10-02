const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "ヒラギノ角ゴ Pr6N",
          "Hiragino Kaku Gothic Pr6N",
          "ヒラギノ角ゴ ProN",
          "Hiragino Kaku Gothic ProN",
          "ヒラギノ角ゴ StdN",
          "Hiragino Kaku Gothic StdN",
          "Segoe UI",
          "Verdana",
          "メイリオ",
          "Meiryo",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          "游明朝",
          "YuMincho",
          "ヒラギノ明朝 Pr6N",
          "Hiragino Mincho Pr6N",
          "ヒラギノ明朝 ProN",
          "Hiragino Mincho ProN",
          "ヒラギノ明朝 StdN",
          "Hiragino Mincho StdN",
          "HiraMinProN-W3",
          "HGS明朝B",
          "HG明朝B",
          ...defaultTheme.fontFamily.serif,
        ],
      },
    },
  },
  plugins: [],
};
