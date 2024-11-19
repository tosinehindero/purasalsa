/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
     extend: {
        colors: {
           "custom-light-blue": "#5de0e6",
           "custom-dark-blue": "#004aad",
           "custom-dark-green": "#256940",
           "custom-dark-red": "#871f26",
           "custom-khaki": "#FBC86D",
           "custom-bluegreen": "#088F8F",
        },
        fontFamily: {
           parisienne: ['"Parisienne"', "cursive"], // Add your new font here
        },
        keyframes: {
           slideInLeft: {
              "0%": { transform: "translateX(-100%)", opacity: "0" },
              "100%": { transform: "translateX(0)", opacity: "1" },
           },
           slideInRight: {
              "0%": { transform: "translateX(100%)", opacity: "0" },
              "100%": { transform: "translateX(0)", opacity: "1" },
           },
        },
        animation: {
           slideInLeft: "slideInLeft 1s ease-out forwards",
           slideInRight: "slideInRight 1s ease-out forwards",
        },
     },
  },
  plugins: [],
};

