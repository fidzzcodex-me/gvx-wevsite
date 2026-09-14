import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode
  className?: string
  narrow?: boolean
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        narrow ? "max-w-2xl" : "max-w-5xl",
        className
      )}
    >
      {children}
    </div>
  )
}
