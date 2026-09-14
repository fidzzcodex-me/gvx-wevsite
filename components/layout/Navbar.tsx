"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGauge,
  faCloudArrowUp,
  faRocket,
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/Avatar"
import { useAuthStore } from "@/store/authStore"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: faGauge },
  { href: "/uploader", label: "Uploader", icon: faCloudArrowUp },
  { href: "/deploy", label: "Deploy", icon: faRocket },
  { href: "/profil", label: "Profil", icon: faUser },
  { href: "/settings", label: "Settings", icon: faGear },
]

export function Navbar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname()
  const githubUser = useAuthStore((s) => s.githubUser)

  return (
    <header className="hidden border-b border-border bg-white md:block dark:border-darkBorder dark:bg-darkBgSubtle">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-mono text-sm font-semibold tracking-tight text-textPrimary dark:text-darkTextPrimary">
            gvx
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                    active
                      ? "bg-primarySoft text-primary"
                      : "text-textSecondary hover:bg-bgSubtle dark:text-darkTextSecondary dark:hover:bg-darkSurface"
                  )}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {githubUser && (
            <Avatar src={githubUser.avatar_url} alt={githubUser.login} size={28} />
          )}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-textSecondary transition-colors duration-200 hover:bg-bgSubtle hover:text-danger dark:text-darkTextSecondary dark:hover:bg-darkSurface"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export { NAV_ITEMS }
