import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "nasa": "url('/images/nasa.png')",
      },
    }, screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'md2': '930px',
      'lg': '1024px',
      'lg2': '1120px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
