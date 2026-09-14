import { faEnvelope, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { Avatar } from "@/components/ui/Avatar"
import { InfoRow } from "@/components/ui/InfoRow"
import type { VercelUser } from "@/types"

export function VercelCard({ user }: { user: VercelUser }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:border-darkBorder dark:bg-darkSurface">
      <div className="flex items-center gap-3">
        <Avatar src={user.avatar} alt={user.username} size={48} />
        <div>
          <p className="font-medium text-textPrimary dark:text-darkTextPrimary">
            {user.name || user.username}
          </p>
          <p className="text-sm text-textMuted">@{user.username}</p>
        </div>
      </div>
      <div className="mt-4">
        <InfoRow icon={faEnvelope} label="Email" value={user.email} />
        <InfoRow icon={faUserGroup} label="Team" value="Personal" />
      </div>
    </div>
  )
}
