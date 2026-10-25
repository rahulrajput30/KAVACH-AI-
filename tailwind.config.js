/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#F8FAFC',
        panel: '#FFFFFF',
        elevated: '#F1F5F9',
        line: '#E5E7EB',
        muted: '#64748B',
        cyan: '#2563EB',
        mint: '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
