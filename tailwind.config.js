import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
        impact: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
        oswald: ['"Oswald"', "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#00C700",
          ink: "#111111",
        },
      },
      boxShadow: {
        card: "0 8px 24px rgba(0, 0, 0, 0.45)",
      },
      aspectRatio: {
        poster: "2 / 3",
      },
      backgroundImage: {
        "poster-overlay":
          "linear-gradient(to top, rgba(23,23,23,0.95) 0%, rgba(23,23,23,0.72) 28%, rgba(23,23,23,0.25) 55%, transparent 78%)",
      },
      width: {
        filter: "190px",
      },
      maxWidth: {
        catalog: "72rem",
        details: "64rem",
      },
      spacing: {
        "page-y": "5rem",
        "page-y-lg": "8rem",
      },
      transitionDuration: {
        refresh: "300ms",
      },
      opacity: {
        soft: "0.85",
      },
      zIndex: {
        filter: "20",
        dropdown: "30",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      const track = theme("colors.neutral.800");
      const thumb = theme("colors.neutral.600");
      const brand = theme("colors.brand.DEFAULT");

      addBase({
        ":root": {
          "--color-brand": brand,
          "--color-brand-ink": theme("colors.brand.ink"),
        },
        html: {
          minHeight: "100%",
          scrollBehavior: "smooth",
        },
        body: {
          minHeight: "100%",
          backgroundColor: track,
          color: theme("colors.white"),
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        },
        "#root": {
          minHeight: "100%",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: thumb + " " + track,
        },
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "*::-webkit-scrollbar-track": {
          background: track,
        },
        "*::-webkit-scrollbar-thumb": {
          background: thumb,
          borderRadius: "999px",
          border: "2px solid " + track,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: brand,
        },
      });
    }),
  ],
};