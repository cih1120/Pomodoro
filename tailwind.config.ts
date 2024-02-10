import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#fff",
        black: "#000",
        red: {
          200: 'rgb(var(--color-red-200) / <alpha-value>)',
        },
        brown: {
          200: 'rgb(var(--color-brown-200) / <alpha-value>)',
        },
        green: {
          200: 'rgb(var(--color-green-200) / <alpha-value>)',
        },
        compared: {
          200: 'rgb(var(--color-compared-200) / <alpha-value>)',
          100: 'rgb(var(--color-compared-100) / <alpha-value>)',
        },
        apricot: {
          200: 'rgb(var(--color-apricot-200) / <alpha-value>)',
          100: 'rgb(var(--color-apricot-100) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        garamond: ['var(--font-eb-garamond)'],
      }
    },
  },
  plugins: [],
};
export default config;
