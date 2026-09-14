"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocket, faArrowUpRightFromSquare, faLayerGroup } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"
import { vercel, VercelError } from "@/lib/vercel"
import { relativeTime } from "@/lib/utils"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Button } from "@/components/ui/Button"
import { StatusDot } from "@/components/ui/StatusDot"
import type { VercelProject } from "@/types"

export function ProjectList({
  projects,
  loading,
  token,
}: {
  projects: VercelProject[] | null
  loading: boolean
  token: string
}) {
  const [deployingId, setDeployingId] = useState<string | null>(null)

  async function triggerDeploy(project: VercelProject) {
    if (!project.link?.repo) {
      toast.error("Project ini tidak terhubung ke repo Git")
      return
    }
    setDeployingId(project.id)
    try {
      await vercel.createDeployment(token, project.name, {
        type: "github",
        ref: "main",
      })
      toast.success(`Deploy untuk ${project.name} dipicu`)
    } catch (err) {
      toast.error(err instanceof VercelError ? err.message : "Gagal memicu deploy")
    } finally {
      setDeployingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return <EmptyState icon={faLayerGroup} title="Belum ada project" description="Project Vercel kamu akan muncul di sini." />
  }

  return (
    <div className="space-y-2">
      {projects.map((project) => {
        const latest = project.latestDeployments?.[0]
        return (
          <div
            key={project.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 dark:border-darkBorder"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
                {project.name}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-textMuted">
                {latest && <StatusDot state={latest.state} />}
                <span>diperbarui {relativeTime(project.updatedAt)}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {latest && (
                <a
                  href={`https://${latest.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-textMuted transition-colors duration-200 hover:bg-bgSubtle hover:text-textPrimary dark:hover:bg-darkSurface dark:hover:text-darkTextPrimary"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                </a>
              )}
              <Button
                size="sm"
                variant="secondary"
                loading={deployingId === project.id}
                onClick={() => triggerDeploy(project)}
              >
                <FontAwesomeIcon icon={faRocket} className="h-3.5 w-3.5" />
                Deploy
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
