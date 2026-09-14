import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function InfoRow({
  icon,
  label,
  value,
}: {
  icon: IconDefinition
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 last:border-0 dark:border-darkBorder">
      <span className="flex items-center gap-2 text-sm text-textSecondary dark:text-darkTextSecondary">
        <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5 text-textMuted" />
        {label}
      </span>
      <span className="text-sm font-medium text-textPrimary dark:text-darkTextPrimary">{value}</span>
    </div>
  )
}
