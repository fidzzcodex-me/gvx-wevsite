import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: IconDefinition
  label: string
  value: React.ReactNode
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 transition-shadow duration-200 hover:shadow-sm dark:border-darkBorder dark:bg-darkSurface">
      <div className="flex items-center gap-2 text-textMuted">
        <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-textPrimary dark:text-darkTextPrimary">
        {value}
      </div>
      {hint && <p className="mt-1 text-xs text-textMuted">{hint}</p>}
    </div>
  )
}
