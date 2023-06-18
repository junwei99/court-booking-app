/** @type {import('tailwindcss').Config} */
const siteMaxWidth = "1150px"
const siteXlMaxWidth = "1450px"
const sitePadding = "1.5rem"
const primaryNormal = "#1D4ED8"
const primaryLight = "#4e72d4"

module.exports = {
  darkMode: false,
  daisyui: {
    themes: ["light"],
  },
  content: ["./src/**/*.{vue,js,ts}"],
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],

  theme: {
    extend: {
      spacing: {
        "site-padding": sitePadding,
      },
      width: {
        "site-width": siteMaxWidth,
      },
      maxWidth: {
        "site-width": siteMaxWidth,
        "xl-site-width": siteXlMaxWidth,
      },
      colors: {
        primary: { light: primaryLight, normal: primaryNormal },
      },
    },
  },
}
