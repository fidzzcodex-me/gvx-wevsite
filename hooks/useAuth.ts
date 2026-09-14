"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { storage } from "@/lib/storage"

export function useAuth(guard = true) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const authStore = useAuthStore()

  useEffect(() => {
    authStore.hydrate()
    const authed = storage.isAuthenticated()
    if (guard && !authed) {
      router.replace("/auth")
      return
    }
    setChecked(true)
  }, [])

  function logout() {
    authStore.clear()
    router.replace("/")
  }

  return {
    checked,
    githubUser: authStore.githubUser,
    vercelUser: authStore.vercelUser,
    githubToken: authStore.githubToken,
    vercelToken: authStore.vercelToken,
    logout,
  }
}
