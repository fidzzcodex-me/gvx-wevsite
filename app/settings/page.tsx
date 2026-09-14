"use client"

import { useAuth } from "@/hooks/useAuth"
import { AppShell } from "@/components/layout/AppShell"
import { TokenSection } from "@/components/settings/TokenSection"
import { ThemeSection } from "@/components/settings/ThemeSection"
import { DangerSection } from "@/components/settings/DangerSection"
import { Skeleton } from "@/components/ui/Skeleton"

function SettingsContent() {
  const { githubToken, vercelToken } = useAuth(true)

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">Settings</h1>
        <p className="mt-0.5 text-sm text-textSecondary dark:text-darkTextSecondary">
          Kelola token, tampilan, dan sesi
        </p>
      </div>

      {githubToken && vercelToken ? (
        <TokenSection githubToken={githubToken} vercelToken={vercelToken} />
      ) : (
        <Skeleton className="h-48" />
      )}

      <ThemeSection />
      <DangerSection />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  )
}
