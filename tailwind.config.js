/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#456a48",
        "primary-dark": "#2d4630",
        "primary-light": "#5a855d",
        "secondary": "#0f172a",
        "surface": "#ffffff",
        "surface-highlight": "#f8fafc",
        "text-main": "#334155",
        "text-muted": "#64748b",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-dark": "#192633",
        "border-dark": "#324d67",
        "text-secondary": "#92adc9",
      },
      fontFamily: {
        "display": ["Inter", "Noto Sans", "sans-serif"],
        "body": ["Inter", "Noto Sans", "sans-serif"],
        "serif": ["Playfair Display", "serif"]
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2700&q=80')",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

