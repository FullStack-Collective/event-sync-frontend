/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)",    "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        "es-bg":           "#06060f",
        "es-bg2":          "#0d0d1e",
        "es-bg3":          "#111128",
        "es-violet":       "#7c3aed",
        "es-violet-light": "#a855f7",
        "es-cyan":         "#06b6d4",
        "es-pink":         "#ec4899",
        "es-gold":         "#f59e0b",
        "es-text":         "#f1f0ff",
        "es-text-muted":   "#8b8aaa",
        "es-text-dim":     "#4a4a6a",
        "es-live":         "#22c55e",
      },
      backgroundImage: {
        "gradient-primary":   "linear-gradient(135deg, #ffc600 0%, #ff005d 100%)",
        "gradient-secondary": "linear-gradient(135deg, #0088ff 0%, #ffc600 100%)",
      },
      boxShadow: {
        "es-glow":    "0 0 24px rgba(124,58,237,0.4)",
        "es-glow-lg": "0 8px 32px rgba(124,58,237,0.4)",
      },
      borderRadius: {
        "es":    "16px",
        "es-sm": "10px",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease both",
        "fade-in":    "fadeIn 0.5s ease both",
        "float":      "float linear infinite",
        "bgShift":    "bgShift 12s ease-in-out infinite alternate",
        "pulseLive":  "pulseLive 1.6s ease-in-out infinite",
        "slide-down": "slideDown 0.4s ease both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%":   { transform: "translateY(100vh) translateX(0)",    opacity: "0"   },
          "10%":  { opacity: "0.5" },
          "90%":  { opacity: "0.15" },
          "100%": { transform: "translateY(-120px) translateX(40px)", opacity: "0" },
        },
        bgShift: {
          "0%":   { opacity: "1",   transform: "scale(1)"    },
          "100%": { opacity: "0.7", transform: "scale(1.06)" },
        },
        pulseLive: {
          "0%, 100%": { boxShadow: "0 0 0 0   rgba(34,197,94,0.55)" },
          "50%":      { boxShadow: "0 0 0 7px rgba(34,197,94,0)"    },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)"     },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};