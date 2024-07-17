/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 2s ease-in-out',
        opacityFade: 'fadeOutOpacity 2s ease-in-out'
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
        fadeOutOpacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.7 },
        }
      }),
    },
  },
  plugins: [],
}

