import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ibazaar: {
          blue: "#0891b2",
          "blue-dark": "#0e7490",
          "blue-light": "#06b6d4",
          green: "#10b981",
          "green-dark": "#059669",
          "green-light": "#34d399",
          orange: "#f59e0b",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
