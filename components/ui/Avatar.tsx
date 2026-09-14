import Image from "next/image"
import { cn } from "@/lib/utils"

export function Avatar({
  src,
  alt,
  size = 40,
  className,
}: {
  src: string | null
  alt: string
  size?: number
  className?: string
}) {
  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className={cn(
          "flex items-center justify-center rounded-full bg-primarySoft text-sm font-semibold text-primary",
          className
        )}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full border border-border object-cover dark:border-darkBorder", className)}
    />
  )
}
