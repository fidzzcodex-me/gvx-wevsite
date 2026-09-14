import { cn } from "@/lib/utils"
import type { VercelDeployment } from "@/types"

const stateColor: Record<VercelDeployment["state"], string> = {
  READY: "bg-success",
  ERROR: "bg-danger",
  BUILDING: "bg-warning",
  QUEUED: "bg-textMuted",
  CANCELED: "bg-textMuted",
  INITIALIZING: "bg-warning",
}

const stateLabel: Record<VercelDeployment["state"], string> = {
  READY: "Siap",
  ERROR: "Gagal",
  BUILDING: "Membangun",
  QUEUED: "Antre",
  CANCELED: "Dibatalkan",
  INITIALIZING: "Memulai",
}

export function StatusDot({ state }: { state: VercelDeployment["state"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-textSecondary dark:text-darkTextSecondary">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          stateColor[state],
          state === "BUILDING" && "animate-pulse"
        )}
      />
      {stateLabel[state]}
    </span>
  )
}
