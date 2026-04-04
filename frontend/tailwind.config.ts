import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        surface: "#161616",
        border: "#262626",
        accent: {
          DEFAULT: "#00B4D8",
          hover: "#0096B4",
        },
        text: {
          primary: "#F5F5F5",
          muted: "#888888",
        },
        error: "#EF4444",
        success: "#22C55E",
      },
    },
  },
  plugins: [],
};
export default config;
