import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: IconDefinition
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center dark:border-darkBorder">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bgSubtle text-textMuted dark:bg-darkBg">
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </div>
      <p className="mt-3 text-sm font-medium text-textPrimary dark:text-darkTextPrimary">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-textMuted">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
