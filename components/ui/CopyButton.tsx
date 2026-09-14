"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons"
import { useCopy } from "@/hooks/useCopy"
import { cn } from "@/lib/utils"

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const { copy, copied } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={cn(
        "rounded-lg p-1.5 text-textMuted transition-colors duration-200 hover:bg-bgSubtle hover:text-textPrimary dark:hover:bg-darkBg dark:hover:text-darkTextPrimary",
        className
      )}
      aria-label="Salin"
    >
      <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={cn("h-3.5 w-3.5", copied && "text-success")} />
    </button>
  )
}
