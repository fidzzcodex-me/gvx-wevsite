"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/Button"
import { ConfirmModal } from "@/components/modals/ConfirmModal"

export function DangerSection() {
  const { logout } = useAuth(false)
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-danger/30 bg-white p-5 dark:bg-darkSurface">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-danger">
        <FontAwesomeIcon icon={faTriangleExclamation} className="h-3.5 w-3.5" />
        Zona berbahaya
      </h2>
      <p className="mt-2 text-sm text-textSecondary dark:text-darkTextSecondary">
        Menghapus token akan mengeluarkan kamu dari dashboard dan menghapus semua data lokal.
      </p>
      <Button variant="danger" size="sm" className="mt-4" onClick={() => setOpen(true)}>
        Hapus token & logout
      </Button>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={logout}
        title="Hapus token & logout"
        description="Token GitHub dan Vercel akan dihapus dari browser ini. Tindakan ini tidak bisa dibatalkan."
      />
    </div>
  )
}
