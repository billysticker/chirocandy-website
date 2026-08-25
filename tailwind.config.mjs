/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#04101F',
        primary: '#123964',
        accent: '#7ED957',
        surface: '#071C36',
        'surface-variant': '#123964',
        'on-surface': '#EAF1FA',
        'on-surface-variant': '#96ABC6',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 34px rgba(126, 217, 87, 0.35)',
        'glow-lg': '0 16px 48px rgba(126, 217, 87, 0.55)',
      },
      borderRadius: {
        DEFAULT: '14px',
        lg: '16px',
        xl: '20px',
      },
    },
  },
  plugins: [],
};
