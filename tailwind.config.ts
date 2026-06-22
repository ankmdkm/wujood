import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:   "#1E40AF",
          cyan:   "#06B6D4",
          green:  "#22C55E",
          dark:   "#0B1220",
        },
      },
      fontFamily: {
        sans: ["Inter", "Cairo", "sans-serif"],
        arabic: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
