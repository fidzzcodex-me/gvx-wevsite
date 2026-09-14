import Link from "next/link"

export function LandingNav() {
  return (
    <header className="border-b border-border dark:border-darkBorder">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
        <span className="font-mono text-sm font-semibold tracking-tight text-textPrimary dark:text-darkTextPrimary">
          gvx
        </span>
        <Link
          href="/auth"
          className="text-sm font-medium text-textSecondary transition-colors duration-200 hover:text-primary dark:text-darkTextSecondary"
        >
          Masuk
        </Link>
      </div>
    </header>
  )
}
