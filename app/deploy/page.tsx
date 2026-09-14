"use client"

import { useAuth } from "@/hooks/useAuth"
import { useVercelProjects } from "@/hooks/useVercel"
import { AppShell } from "@/components/layout/AppShell"
import { ProjectList } from "@/components/deploy/ProjectList"

function DeployContent() {
  const { vercelToken } = useAuth(true)
  const { projects, loading } = useVercelProjects(vercelToken)

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">Deploy</h1>
        <p className="mt-0.5 text-sm text-textSecondary dark:text-darkTextSecondary">
          Project Vercel dan status deployment terakhir
        </p>
      </div>
      <ProjectList projects={projects} loading={loading} token={vercelToken as string} />
    </div>
  )
}

export default function DeployPage() {
  return (
    <AppShell>
      <DeployContent />
    </AppShell>
  )
}
