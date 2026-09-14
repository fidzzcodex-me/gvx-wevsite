"use client"

import { faMoon } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useUiStore } from "@/store/uiStore"
import { Toggle } from "@/components/ui/Toggle"

export function ThemeSection() {
  const theme = useUiStore((s) => s.theme)
  const setTheme = useUiStore((s) => s.setTheme)

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:border-darkBorder dark:bg-darkSurface">
      <h2 className="text-sm font-semibold text-textPrimary dark:text-darkTextPrimary">Tampilan</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-textSecondary dark:text-darkTextSecondary">
          <FontAwesomeIcon icon={faMoon} className="h-3.5 w-3.5" />
          Dark mode
        </span>
        <Toggle
          checked={theme === "dark"}
          onChange={(checked) => setTheme(checked ? "dark" : "light")}
          label="Dark mode"
        />
      </div>
    </div>
  )
}
