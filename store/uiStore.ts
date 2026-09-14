import { create } from "zustand"

type Theme = "light" | "dark"

interface UiState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme })
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
      window.localStorage.setItem("gvx_theme", theme)
    }
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark"
    get().setTheme(next)
  },
}))
