import Link from "next/link"
import { faRocket } from "@fortawesome/free-solid-svg-icons"
import { relativeTime } from "@/lib/utils"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { StatusDot } from "@/components/ui/StatusDot"
import type { VercelDeployment } from "@/types"

export function DeploymentList({
  deployments,
  loading,
}: {
  deployments: VercelDeployment[] | null
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14" />
        ))}
      </div>
    )
  }

  if (!deployments || deployments.length === 0) {
    return <EmptyState icon={faRocket} title="Belum ada deployment" description="Deployment terbaru dari Vercel akan tampil di sini." />
  }

  return (
    <div className="divide-y divide-border rounded-xl border border-border dark:divide-darkBorder dark:border-darkBorder">
      {deployments.map((d) => (
        <Link
          key={d.uid}
          href={`https://${d.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 hover:bg-bgSubtle dark:hover:bg-darkSurface"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-textPrimary dark:text-darkTextPrimary">{d.name}</p>
            <p className="mt-0.5 text-xs text-textMuted">
              {d.target || "preview"} · {relativeTime(d.created)}
            </p>
          </div>
          <StatusDot state={d.state} />
        </Link>
      ))}
    </div>
  )
}
