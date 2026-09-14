import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCodeBranch, faUsers, faFileLines, faGaugeHigh } from "@fortawesome/free-solid-svg-icons"
import { StatCard } from "@/components/ui/StatCard"
import { Skeleton } from "@/components/ui/Skeleton"
import type { GithubUser, GithubRateLimit } from "@/types"

export function StatsGrid({
  githubUser,
  rateLimit,
  loading,
}: {
  githubUser: GithubUser | null
  rateLimit: GithubRateLimit | null
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  const remaining = rateLimit?.resources.core.remaining
  const limit = rateLimit?.resources.core.limit

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard icon={faCodeBranch} label="Repos" value={githubUser?.public_repos ?? "—"} />
      <StatCard icon={faUsers} label="Followers" value={githubUser?.followers ?? "—"} />
      <StatCard icon={faFileLines} label="Gists" value={githubUser?.public_gists ?? "—"} />
      <StatCard
        icon={faGaugeHigh}
        label="Rate limit"
        value={remaining !== undefined ? remaining : "—"}
        hint={limit ? `dari ${limit}` : undefined}
      />
    </div>
  )
}
