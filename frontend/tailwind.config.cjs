/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae2fd',
          300: '#7cccfd',
          400: '#36b3f9',
          500: '#0c96eb',
          600: '#0284e5',
          700: '#0369c7',
          800: '#0957a2',
          900: '#0c4a83',
        },
        secondary: {
          900: '#1e1b4b',
          800: '#2e2b6b',
          700: '#3e3b8b',
          600: '#4e4bab',
          500: '#5e5bcb',
          400: '#6e6beb',
          300: '#7e7bff',
          200: '#8e8bff',
          100: '#9e9bff',
          50: '#aeabff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
} 