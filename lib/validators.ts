import { z } from "zod"

export const authSchema = z.object({
  githubToken: z
    .string()
    .min(20, "Token GitHub terlalu pendek")
    .refine((val) => val.startsWith("ghp_") || val.startsWith("github_pat_"), {
      message: "Format token GitHub tidak dikenali",
    }),
  vercelToken: z.string().min(20, "Token Vercel terlalu pendek"),
})

export type AuthFormValues = z.infer<typeof authSchema>

export const uploadSchema = z.object({
  repo: z.string().min(1, "Pilih repo"),
  branch: z.string().min(1, "Branch wajib diisi"),
  path: z.string().min(1, "Path file wajib diisi"),
  message: z.string().min(1, "Commit message wajib diisi"),
  content: z.string().optional(),
})

export type UploadFormValues = z.infer<typeof uploadSchema>
