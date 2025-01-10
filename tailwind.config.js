/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        // Add custom colors here if needed
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'], 
        serif: ['Merriweather', 'serif'], 
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
