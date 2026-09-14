import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

export function Spinner({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faSpinner} className={cn("animate-spin text-primary", className)} />
}
