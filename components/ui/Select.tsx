import { SelectHTMLAttributes, forwardRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "h-10 w-full appearance-none rounded-lg border border-border bg-white px-3 pr-9 text-[15px] text-textPrimary outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
              "dark:border-darkBorder dark:bg-darkSurface dark:text-darkTextPrimary",
              error && "border-danger",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-textMuted"
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
      </div>
    )
  }
)

Select.displayName = "Select"
