"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faRotate } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"
import { github, GithubError } from "@/lib/github"
import { vercel, VercelError } from "@/lib/vercel"
import { TokenInput } from "@/components/ui/TokenInput"
import { Button } from "@/components/ui/Button"

export function TokenSection({
  githubToken,
  vercelToken,
}: {
  githubToken: string
  vercelToken: string
}) {
  const [verifying, setVerifying] = useState<"github" | "vercel" | null>(null)

  async function reverify(kind: "github" | "vercel") {
    setVerifying(kind)
    try {
      if (kind === "github") {
        await github.getUser(githubToken)
      } else {
        await vercel.getUser(vercelToken)
      }
      toast.success(`Token ${kind === "github" ? "GitHub" : "Vercel"} masih valid`)
    } catch (err) {
      const message =
        err instanceof GithubError || err instanceof VercelError
          ? err.message
          : "Verifikasi gagal"
      toast.error(message)
    } finally {
      setVerifying(null)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:border-darkBorder dark:bg-darkSurface">
      <h2 className="text-sm font-semibold text-textPrimary dark:text-darkTextPrimary">Token</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-textSecondary dark:text-darkTextSecondary">
            GitHub PAT
          </label>
          <div className="flex gap-2">
            <TokenInput value={githubToken} readOnly className="flex-1" />
            <Button
              variant="secondary"
              size="sm"
              loading={verifying === "github"}
              onClick={() => reverify("github")}
            >
              <FontAwesomeIcon icon={faRotate} className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-textSecondary dark:text-darkTextSecondary">
            Vercel Token
          </label>
          <div className="flex gap-2">
            <TokenInput value={vercelToken} readOnly className="flex-1" />
            <Button
              variant="secondary"
              size="sm"
              loading={verifying === "vercel"}
              onClick={() => reverify("vercel")}
            >
              <FontAwesomeIcon icon={faRotate} className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-textMuted">
        <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3 text-success" />
        Token disimpan hanya di localStorage browser ini
      </p>
    </div>
  )
}
