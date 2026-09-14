"use client"

import { useEffect } from "react"
import { useUiStore } from "@/store/uiStore"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useUiStore((s) => s.setTheme)

  useEffect(() => {
    const saved = window.localStorage.getItem("gvx_theme")
    if (saved === "dark" || saved === "light") {
      setTheme(saved)
    }
  }, [setTheme])

  return <>{children}</>
}
