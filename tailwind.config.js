// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Quét tất cả file .js, .jsx, .ts, .tsx trong thư mục src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb', // xanh accent
        bg: '#f9fafb',      // nền sáng
        surface: '#ffffff', // card
        text: '#111827',    // đen nhẹ
        muted: '#6b7280',   // xám
      },
    },
  },
}