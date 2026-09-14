import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        primarySoft: "#EFF6FF",
        success: "#10B981",
        warning: "#D97706",
        danger: "#DC2626",
        bg: "#FFFFFF",
        bgSubtle: "#F8FAFC",
        border: "#E5E7EB",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        textMuted: "#94A3B8",
        darkBg: "#0B1120",
        darkBgSubtle: "#111827",
        darkSurface: "#1E293B",
        darkBorder: "#334155",
        darkTextPrimary: "#F1F5F9",
        darkTextSecondary: "#CBD5E1",
        darkTextMuted: "#94A3B8",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        base: ["15px", "1.6"],
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 23 42 / 0.06)",
        card: "0 1px 3px 0 rgb(15 23 42 / 0.08)",
        lg: "0 10px 25px -5px rgb(15 23 42 / 0.15)",
      },
    },
  },
  plugins: [],
}
export default config
