"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { useGithubDashboard } from "@/hooks/useGithub"
import { useVercelDeployments } from "@/hooks/useVercel"
import { AppShell } from "@/components/layout/AppShell"
import { Button } from "@/components/ui/Button"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RepoList } from "@/components/dashboard/RepoList"
import { DeploymentList } from "@/components/dashboard/DeploymentList"
import { GithubError } from "@/lib/github"

function DashboardContent() {
  const { githubUser, githubToken, vercelToken, logout } = useAuth(true)
  const github = useGithubDashboard(githubToken)
  const vercel = useVercelDeployments(vercelToken)

  if (github.error && github.error.includes("Bad credentials")) {
    logout()
  }

  function refresh() {
    github.reload()
    vercel.reload()
    toast.success("Data diperbarui")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
            Halo, {githubUser?.login ?? "developer"}
          </h1>
          <p className="mt-0.5 text-sm text-textSecondary dark:text-darkTextSecondary">
            Ringkasan akun GitHub dan Vercel kamu
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={refresh} loading={github.loading || vercel.loading}>
          <FontAwesomeIcon icon={faArrowRotateRight} className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>

      <StatsGrid githubUser={githubUser} rateLimit={github.data?.rateLimit ?? null} loading={github.loading} />

      <div>
        <h2 className="mb-3 text-sm font-semibold text-textPrimary dark:text-darkTextPrimary">Repo terbaru</h2>
        <RepoList repos={github.data?.repos ?? null} loading={github.loading} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-textPrimary dark:text-darkTextPrimary">Deploy terbaru</h2>
        <DeploymentList deployments={vercel.deployments} loading={vercel.loading} />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  )
}
