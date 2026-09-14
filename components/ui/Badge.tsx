import { cn } from "@/lib/utils"

type Tone = "neutral" | "success" | "warning" | "danger" | "primary"

const toneClass: Record<Tone, string> = {
  neutral: "bg-bgSubtle text-textSecondary dark:bg-darkBg dark:text-darkTextSecondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  primary: "bg-primarySoft text-primary",
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
