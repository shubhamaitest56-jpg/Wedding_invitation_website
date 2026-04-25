/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-great-vibes)', 'cursive'],
        dancing: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
