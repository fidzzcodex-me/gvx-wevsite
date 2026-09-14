"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "ghost" | "danger"
type Size = "sm" | "md"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primaryHover shadow-sm disabled:bg-primary/50",
  secondary:
    "border border-border text-textPrimary hover:bg-bgSubtle dark:border-darkBorder dark:text-darkTextPrimary dark:hover:bg-darkSurface",
  ghost:
    "text-textSecondary hover:bg-bgSubtle dark:text-darkTextSecondary dark:hover:bg-darkSurface",
  danger:
    "bg-danger text-white hover:bg-danger/90 shadow-sm disabled:bg-danger/50",
}

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-[15px] gap-2",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed",
          variantClass[variant],
          sizeClass[size],
          className
        )}
        {...(props as any)}
      >
        {loading && <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"
