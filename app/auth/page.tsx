import { AuthForm } from "@/components/auth/AuthForm"

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 dark:bg-darkBg">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-mono text-sm font-semibold tracking-tight text-textPrimary dark:text-darkTextPrimary">
            gvx
          </span>
          <h1 className="mt-3 text-xl font-semibold text-textPrimary dark:text-darkTextPrimary">
            Hubungkan akun
          </h1>
          <p className="mt-1 text-sm text-textSecondary dark:text-darkTextSecondary">
            Masukkan token GitHub dan Vercel milikmu
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
