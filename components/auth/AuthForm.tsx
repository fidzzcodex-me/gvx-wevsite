"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"
import { authSchema, type AuthFormValues } from "@/lib/validators"
import { github, GithubError } from "@/lib/github"
import { vercel, VercelError } from "@/lib/vercel"
import { useAuthStore } from "@/store/authStore"
import { storage } from "@/lib/storage"
import { TokenInput } from "@/components/ui/TokenInput"
import { Button } from "@/components/ui/Button"

export function AuthForm() {
  const router = useRouter()
  const setSession = useAuthStore((s) => s.setSession)
  const [formError, setFormError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({ resolver: zodResolver(authSchema) })

  async function onSubmit(values: AuthFormValues) {
    setFormError(null)
    setVerifying(true)
    try {
      const [githubUser, vercelUser] = await Promise.all([
        github.getUser(values.githubToken),
        vercel.getUser(values.vercelToken),
      ])
      setSession({
        githubToken: values.githubToken,
        vercelToken: values.vercelToken,
        githubUser,
        vercelUser,
      })
      toast.success("Terhubung. Mengalihkan ke dashboard.")
      router.push("/dashboard")
    } catch (err) {
      if (err instanceof GithubError) {
        setFormError(
          err.status === 401
            ? "Token GitHub ditolak. Periksa kembali token dan scope-nya."
            : `GitHub: ${err.message}`
        )
      } else if (err instanceof VercelError) {
        setFormError(
          err.status === 401
            ? "Token Vercel ditolak. Periksa kembali token."
            : `Vercel: ${err.message}`
        )
      } else if (err instanceof TypeError) {
        setFormError("Tidak bisa menghubungi API. Periksa koneksi internet.")
      } else {
        setFormError("Verifikasi gagal. Coba lagi.")
      }
    } finally {
      setVerifying(false)
    }
  }

  function clearLocalTokens() {
    storage.clearAll()
    toast.success("Token lokal dihapus")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
          GitHub Personal Access Token
        </label>
        <TokenInput
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          error={errors.githubToken?.message}
          {...register("githubToken")}
        />
        <p className="mt-1.5 text-xs text-textMuted">Scope yang dibutuhkan: repo, read:user</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
          Vercel Token
        </label>
        <TokenInput
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
          error={errors.vercelToken?.message}
          {...register("vercelToken")}
        />
        <p className="mt-1.5 text-xs text-textMuted">Dibuat dari Account Settings → Tokens</p>
      </div>

      {formError && (
        <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {formError}
        </div>
      )}

      <Button type="submit" loading={verifying} className="w-full">
        {verifying ? "Memverifikasi..." : "Verifikasi & lanjut"}
      </Button>

      <button
        type="button"
        onClick={clearLocalTokens}
        className="flex w-full items-center justify-center gap-1.5 text-xs text-textMuted transition-colors duration-200 hover:text-danger"
      >
        <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
        Hapus token lokal
      </button>
    </form>
  )
}
