"use client"

import { useCallback, useEffect, useState } from "react"
import { github } from "@/lib/github"
import { cacheGet, cacheSet } from "@/lib/storage"
import type { GithubRepo, GithubRateLimit } from "@/types"

const CACHE_MS = 5 * 60 * 1000

interface GithubDashData {
  repos: GithubRepo[]
  rateLimit: GithubRateLimit | null
}

export function useGithubDashboard(token: string | null) {
  const [data, setData] = useState<GithubDashData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(
    async (force = false) => {
      if (!token) return
      setLoading(true)
      setError(null)
      const cacheKey = "gvx_cache_github_dash"
      if (!force) {
        const cached = cacheGet<GithubDashData>(cacheKey, CACHE_MS)
        if (cached) {
          setData(cached)
          setLoading(false)
          return
        }
      }
      try {
        const [repos, rateLimit] = await Promise.all([
          github.getRepos(token, 5),
          github.getRateLimit(token),
        ])
        const next = { repos, rateLimit }
        setData(next)
        cacheSet(cacheKey, next)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data GitHub")
      } finally {
        setLoading(false)
      }
    },
    [token]
  )

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: () => load(true) }
}
