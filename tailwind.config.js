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
        'custom-light-blue': '#5de0e6',
        'custom-dark-blue': '#004aad',
        'custom-dark-green':'#256940',
        'custom-dark-red':'#871f26',
        'custom-khaki':'#FBC86D',
        'custom-bluegreen':'#088F8F'
      },
    },
  },
  plugins: [],
};