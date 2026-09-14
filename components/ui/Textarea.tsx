import { TextareaHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  mono?: boolean
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, mono, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            "w-full min-h-[200px] rounded-lg border border-border bg-white px-3 py-2.5 text-[15px] text-textPrimary placeholder:text-textMuted outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
            "dark:border-darkBorder dark:bg-darkSurface dark:text-darkTextPrimary dark:placeholder:text-darkTextMuted",
            mono && "font-mono text-sm leading-relaxed",
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

Textarea.displayName = "Textarea"
