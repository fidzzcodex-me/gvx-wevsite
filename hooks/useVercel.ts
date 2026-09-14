"use client"

import { useCallback, useEffect, useState } from "react"
import { vercel } from "@/lib/vercel"
import { cacheGet, cacheSet } from "@/lib/storage"
import type { VercelDeployment, VercelProject } from "@/types"

const CACHE_MS = 5 * 60 * 1000

export function useVercelDeployments(token: string | null) {
  const [deployments, setDeployments] = useState<VercelDeployment[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(
    async (force = false) => {
      if (!token) return
      setLoading(true)
      setError(null)
      const cacheKey = "gvx_cache_vercel_deploys"
      if (!force) {
        const cached = cacheGet<VercelDeployment[]>(cacheKey, CACHE_MS)
        if (cached) {
          setDeployments(cached)
          setLoading(false)
          return
        }
      }
      try {
        const data = await vercel.getDeployments(token, 5)
        setDeployments(data)
        cacheSet(cacheKey, data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat deployment")
      } finally {
        setLoading(false)
      }
    },
    [token]
  )

  useEffect(() => {
    load()
  }, [load])

  return { deployments, loading, error, reload: () => load(true) }
}

export function useVercelProjects(token: string | null) {
  const [projects, setProjects] = useState<VercelProject[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const data = await vercel.getProjects(token)
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat project")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  return { projects, loading, error, reload: load }
}
