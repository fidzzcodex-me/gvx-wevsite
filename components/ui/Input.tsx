import { InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, mono, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "h-10 w-full rounded-lg border border-border bg-white px-3 text-[15px] text-textPrimary placeholder:text-textMuted outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
            "dark:border-darkBorder dark:bg-darkSurface dark:text-darkTextPrimary dark:placeholder:text-darkTextMuted",
            mono && "font-mono text-sm",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"
