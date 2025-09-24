/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'kvanto': {
          50: '#f0fdf4',  // Light green
          500: '#22c55e', // Green
          600: '#16a34a', // Darker green
          700: '#15803d', // Casino table green
          800: '#166534', // Deep green
          900: '#14532d', // Darkest green
        },
        'casino': {
          'red': {
            500: '#ef4444', // Bright red
            600: '#dc2626', // Red
            700: '#b91c1c', // Dark red
          },
          'gold': {
            400: '#fbbf24', // Light gold
            500: '#f59e0b', // Gold
            600: '#d97706', // Dark gold
          }
        }
      }
    },
  },
  plugins: [],
}