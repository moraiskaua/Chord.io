import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C47BFD',
        secondary: '#8C52B9',
        tertiary: '#231C24',
      },
      boxShadow: {
        custom: 'inset 15px 15px 50px 5px rgba(0,0,0,0.40)',
      },
    },
  },
  plugins: [],
};
export default config;
