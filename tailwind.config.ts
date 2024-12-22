import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
  		opensans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
  		lato: ['var(--font-lato)', 'system-ui', 'sans-serif'],
  		roboto: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      sofiasans: ['var(--font-sofia-sans)', 'system-ui', 'sans-serif'],
      rubik: ['var(--font-rubik)', 'system-ui', 'sans-serif'],
      geistsans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      geistmono: ['var(--font-geist-mono)', 'system-ui', 'sans-serif'],
      inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    },
    extend: {
  		borderRadius: {
  			lg: '0.5rem',
  			md: 'calc(0.5rem - 2px)',
  			sm: 'calc(0.5rem - 4px)'
  		},
    },
  },
  plugins: [],
};

export default config;
