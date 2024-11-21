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
};
