/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sadc: {
          navy: '#1B2A4A',
          'navy-hover': '#132039',
          'navy-light': '#EEF2F9',
          gold: '#C9A227',
          'gold-hover': '#B28E1E',
          'gold-light': '#FDF9EC',
          bg: '#FAFAF7',
          surface: '#FFFFFF',
          border: '#E4E2DA',
          text: '#2B2B2B',
          muted: '#6B6B65',
          'card-bg': '#FAF9F5'
        }
      },
      fontFamily: {
        serif: ['"Lora"', '"Merriweather"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Courier New', 'monospace']
      },
      boxShadow: {
        'token': '0 1px 3px rgba(27, 42, 74, 0.05)',
        'subtle': '0 2px 8px rgba(27, 42, 74, 0.04)',
        'elevated': '0 4px 16px rgba(27, 42, 74, 0.08)',
      }
    },
  },
  plugins: [],
}
