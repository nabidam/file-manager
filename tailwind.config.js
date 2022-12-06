/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{edge,js,ts,vue,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      success: "#2e7d32",
      "success-dark": "#1b5e20",
      error: "#d32f2f",
      "error-dark": "#c62828",
      info: "#0288d1",
      "info-dark": "#01579b",
      warning: "#ed6c02",
      "warning-dark": "#e65100",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      bg: "#1d1b22",
      "bg-light": "#26262E",
      "bg-hover": "#34343B",
      "border-hover": "#47474E",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    container: {
      padding: "2rem",
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
