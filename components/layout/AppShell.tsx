"use client"

import { useAuth } from "@/hooks/useAuth"
import { Navbar } from "@/components/layout/Navbar"
import { MobileNav } from "@/components/layout/MobileNav"
import { Container } from "@/components/layout/Container"
import { Spinner } from "@/components/ui/Spinner"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { checked, logout } = useAuth(true)

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg dark:bg-darkBg">
        <Spinner className="h-5 w-5" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-darkBg">
      <Navbar onLogout={logout} />
      <main className="pb-20 pt-6 md:pb-10">
        <Container>{children}</Container>
      </main>
      <MobileNav />
    </div>
  )
}
