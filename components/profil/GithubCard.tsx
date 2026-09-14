import {
  faLocationDot,
  faBuilding,
  faUsers,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons"
import { Avatar } from "@/components/ui/Avatar"
import { InfoRow } from "@/components/ui/InfoRow"
import type { GithubUser } from "@/types"

export function GithubCard({ user }: { user: GithubUser }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:border-darkBorder dark:bg-darkSurface">
      <div className="flex items-center gap-3">
        <Avatar src={user.avatar_url} alt={user.login} size={48} />
        <div>
          <p className="font-medium text-textPrimary dark:text-darkTextPrimary">
            {user.name || user.login}
          </p>
          <p className="text-sm text-textMuted">@{user.login}</p>
        </div>
      </div>
      {user.bio && (
        <p className="mt-3 text-sm text-textSecondary dark:text-darkTextSecondary">{user.bio}</p>
      )}
      <div className="mt-4">
        {user.location && <InfoRow icon={faLocationDot} label="Lokasi" value={user.location} />}
        {user.company && <InfoRow icon={faBuilding} label="Company" value={user.company} />}
        <InfoRow icon={faUsers} label="Followers" value={user.followers} />
        <InfoRow icon={faCodeBranch} label="Repos" value={user.public_repos} />
      </div>
    </div>
  )
}
