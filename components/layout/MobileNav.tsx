"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/components/layout/Navbar"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-white md:hidden dark:border-darkBorder dark:bg-darkBgSubtle">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors duration-200",
              active ? "text-primary" : "text-textMuted"
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg",
                active && "bg-primarySoft"
              )}
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
            </span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
