"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleExclamation,
  faCircleCheck,
  faPen,
  faUpload,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"
import { uploadSchema, type UploadFormValues } from "@/lib/validators"
import { github, GithubError } from "@/lib/github"
import { base64Encode, fileToBase64, cn } from "@/lib/utils"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import { CopyButton } from "@/components/ui/CopyButton"
import type { GithubRepo, CommitResult } from "@/types"

export function UploadForm({ repos, token }: { repos: GithubRepo[]; token: string }) {
  const [tab, setTab] = useState<"manual" | "file">("manual")
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<CommitResult | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: { branch: "main" },
  })

  const selectedRepo = watch("repo")

  async function onSubmit(values: UploadFormValues) {
    setFormError(null)
    setResult(null)

    if (tab === "manual" && !values.content) {
      setFormError("Isi konten file terlebih dahulu")
      return
    }
    if (tab === "file" && !file) {
      setFormError("Pilih file untuk diunggah")
      return
    }
    if (tab === "file" && file && file.size > 500 * 1024) {
      setFormError("Ukuran file maksimal 500KB")
      return
    }

    const [owner, repo] = values.repo.split("/")
    setSubmitting(true)
    try {
      const existing = await github.getFileContent(token, owner, repo, values.path, values.branch)
      const content =
        tab === "file" && file ? await fileToBase64(file) : base64Encode(values.content || "")

      const res = await github.createOrUpdateFile(token, owner, repo, values.path, {
        message: values.message,
        content,
        branch: values.branch,
        sha: existing?.sha,
      })

      setResult({ commitUrl: res.commit.html_url, sha: res.commit.sha })
      toast.success("File berhasil di-commit")
    } catch (err) {
      if (err instanceof GithubError) {
        setFormError(`GitHub: ${err.message}`)
      } else {
        setFormError("Commit gagal. Coba lagi.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
          Repo
        </label>
        <Select error={errors.repo?.message} {...register("repo")}>
          <option value="">Pilih repo</option>
          {repos.map((r) => (
            <option key={r.id} value={r.full_name}>
              {r.full_name}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
            Branch
          </label>
          <Input mono placeholder="main" error={errors.branch?.message} {...register("branch")} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
            Path file
          </label>
          <Input mono placeholder="src/data.json" error={errors.path?.message} {...register("path")} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-textPrimary dark:text-darkTextPrimary">
          Commit message
        </label>
        <Input placeholder="update: tambah data baru" error={errors.message?.message} {...register("message")} />
      </div>

      <div>
        <div className="mb-2 flex gap-1 rounded-lg border border-border p-1 dark:border-darkBorder">
          <button
            type="button"
            onClick={() => setTab("manual")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors duration-200",
              tab === "manual"
                ? "bg-primarySoft text-primary"
                : "text-textSecondary dark:text-darkTextSecondary"
            )}
          >
            <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
            Tulis manual
          </button>
          <button
            type="button"
            onClick={() => setTab("file")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition-colors duration-200",
              tab === "file"
                ? "bg-primarySoft text-primary"
                : "text-textSecondary dark:text-darkTextSecondary"
            )}
          >
            <FontAwesomeIcon icon={faUpload} className="h-3 w-3" />
            Upload file
          </button>
        </div>

        {tab === "manual" ? (
          <Textarea mono placeholder="Isi konten file di sini" {...register("content")} />
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-8 text-center transition-colors duration-200 hover:bg-bgSubtle dark:border-darkBorder dark:hover:bg-darkSurface">
            <FontAwesomeIcon icon={faCloudArrowUp} className="h-5 w-5 text-textMuted" />
            <span className="text-sm text-textSecondary dark:text-darkTextSecondary">
              {file ? file.name : "Klik untuk pilih file (maks 500KB)"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
      </div>

      {formError && (
        <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
          <FontAwesomeIcon icon={faCircleExclamation} className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {formError}
        </div>
      )}

      {result && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-success/30 bg-success/5 p-3 text-sm text-success">
          <div className="flex items-start gap-2">
            <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <div>
              <p>Commit berhasil</p>
              <a href={result.commitUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs underline">
                {result.sha.slice(0, 7)}
              </a>
            </div>
          </div>
          <CopyButton value={result.commitUrl} />
        </div>
      )}

      <Button type="submit" loading={submitting} disabled={!selectedRepo} className="w-full">
        {submitting ? "Mengunggah..." : "Commit & Push"}
      </Button>
    </form>
  )
}
