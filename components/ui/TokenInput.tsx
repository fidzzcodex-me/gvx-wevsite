"use client"

import { InputHTMLAttributes, forwardRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

interface TokenInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  ({ className, error, ...props }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            className={cn(
              "h-10 w-full rounded-lg border border-border bg-white px-3 pr-10 font-mono text-sm text-textPrimary outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
              "dark:border-darkBorder dark:bg-darkSurface dark:text-darkTextPrimary",
              error && "border-danger focus:border-danger focus:ring-danger/20",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-textMuted transition-colors duration-200 hover:text-textPrimary dark:hover:text-darkTextPrimary"
            aria-label={visible ? "Sembunyikan token" : "Tampilkan token"}
          >
            <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="h-3.5 w-3.5" />
          </button>
        </div>
        {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
      </div>
    )
  }
)

TokenInput.displayName = "TokenInput"
