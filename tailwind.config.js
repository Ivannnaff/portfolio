/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        anthropic: {
          canvas: '#faf9f5',
          ink: '#141413',
          'ink-soft': '#3d3d3a',
          muted: '#5e5d59',
          secondary: '#b0aea5',
          surface: '#f0eee6',
          warm: '#e3dacc',
          hairline: '#d1cfc5',
          inverse: '#000000',
          clay: '#d97757',
          fig: '#c46686',
          cactus: '#bcd1ca',
          sky: '#6a9bcc',
        }
      },
      borderRadius: {
        'anthropic-sm': '8px',
        'anthropic-md': '16px',
        'anthropic-lg': '24px',
      }
    },
  },
  plugins: [],
}
