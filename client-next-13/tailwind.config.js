const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          wiggle: 'wiggle 1s ease-in-out infinite',
      },
      fontFamily: {
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        lora: ["Lora", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
