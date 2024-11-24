module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ["DM Sans", "sans-serif"],
        CircularStd: ["Circular Std"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myCustomLight: {
          primary: "#3490dc",
          secondary: "#ffed4a",
          accent: "#38c172",
          neutral: "#f5f5f5",
          "base-100": "#ffffff",
        },
        myCustomDark: {
          primary: "#1c1917",
          secondary: "#9333ea",
          accent: "#38bdf8",
          neutral: "#2a2a2a",
          "base-100": "#000000",
        },
      },
    ],
  },
};
