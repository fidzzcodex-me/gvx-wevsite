import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faStar, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import { relativeTime } from "@/lib/utils"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import type { GithubRepo } from "@/types"

export function RepoList({ repos, loading }: { repos: GithubRepo[] | null; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14" />
        ))}
      </div>
    )
  }

  if (!repos || repos.length === 0) {
    return <EmptyState icon={faFolderOpen} title="Belum ada repo" description="Repo yang kamu punya akan muncul di sini." />
  }

  return (
    <div className="divide-y divide-border rounded-xl border border-border dark:divide-darkBorder dark:border-darkBorder">
      {repos.map((repo) => (
        <Link
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 hover:bg-bgSubtle dark:hover:bg-darkSurface"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
                {repo.name}
              </span>
              {repo.private && <FontAwesomeIcon icon={faLock} className="h-3 w-3 text-textMuted" />}
            </div>
            <p className="mt-0.5 text-xs text-textMuted">
              {repo.language || "Tanpa bahasa"} · diperbarui {relativeTime(repo.updated_at)}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs text-textMuted">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
            {repo.stargazers_count}
          </span>
        </Link>
      ))}
    </div>
  )
}
