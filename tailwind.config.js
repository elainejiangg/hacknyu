module.exports = {
  theme: {
    extend: {
      keyframes: {
        "scroll-background": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-1020px)" },
        },
        "sea-scroll": {
          "0%": { transform: "translateX(-1020px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "scroll-background": "scroll-background 20s linear infinite",
        "sea-scroll": "sea-scroll 15s linear infinite",
      },
    },
  },
};
