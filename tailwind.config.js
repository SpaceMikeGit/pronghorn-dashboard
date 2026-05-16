/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':       '#0F0E0D',
        'bg-left':       '#0A0908',
        'bg-card':       '#1A1916',
        'bg-card-hover': '#201E1A',
        'accent':        '#E8431A',
        'accent-red':    '#E8431A',
        'text-primary':  '#F2EDE4',
        'text-secondary':'#8C8479',
        'text-tertiary': '#5A554F',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderColor: {
        DEFAULT:       'rgba(242,237,228,0.07)',
        accent:        'rgba(193,127,36,0.3)',
      },
    },
  },
  plugins: [],
}
