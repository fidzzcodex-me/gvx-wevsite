"use client"

import { useEffect, useState } from "react"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "@/hooks/useAuth"
import { github } from "@/lib/github"
import { AppShell } from "@/components/layout/AppShell"
import { UploadForm } from "@/components/uploader/UploadForm"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import type { GithubRepo } from "@/types"

function UploaderContent() {
  const { githubToken } = useAuth(true)
  const [repos, setRepos] = useState<GithubRepo[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!githubToken) return
    github
      .getRepos(githubToken, 100)
      .then(setRepos)
      .finally(() => setLoading(false))
  }, [githubToken])

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">Uploader</h1>
        <p className="mt-0.5 text-sm text-textSecondary dark:text-darkTextSecondary">
          Commit atau perbarui file ke repo GitHub
        </p>
      </div>

      {loading ? (
        <Skeleton className="h-96" />
      ) : repos && repos.length > 0 ? (
        <UploadForm repos={repos} token={githubToken as string} />
      ) : (
        <EmptyState icon={faFolderOpen} title="Belum ada repo" description="Buat repo di GitHub terlebih dahulu." />
      )}
    </div>
  )
}

export default function UploaderPage() {
  return (
    <AppShell>
      <UploaderContent />
    </AppShell>
  )
}
