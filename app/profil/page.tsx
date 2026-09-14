"use client"

import { useAuth } from "@/hooks/useAuth"
import { AppShell } from "@/components/layout/AppShell"
import { GithubCard } from "@/components/profil/GithubCard"
import { VercelCard } from "@/components/profil/VercelCard"
import { Skeleton } from "@/components/ui/Skeleton"

function ProfilContent() {
  const { githubUser, vercelUser } = useAuth(true)

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">Profil</h1>
        <p className="mt-0.5 text-sm text-textSecondary dark:text-darkTextSecondary">
          Data akun, hanya untuk dilihat
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {githubUser ? <GithubCard user={githubUser} /> : <Skeleton className="h-56" />}
        {vercelUser ? <VercelCard user={vercelUser} /> : <Skeleton className="h-56" />}
      </div>
    </div>
  )
}

export default function ProfilPage() {
  return (
    <AppShell>
      <ProfilContent />
    </AppShell>
  )
}
