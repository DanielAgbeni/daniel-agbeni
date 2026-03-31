import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
        'border-line': 'var(--border-line)',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.12)',
        card: '0 2px 16px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        panel: '1rem'
      }
    }
  },
  plugins: []
};

export default config;
