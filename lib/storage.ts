import type { GithubUser, VercelUser } from "@/types"

const KEYS = {
  githubToken: "gvx_github_token",
  vercelToken: "gvx_vercel_token",
  githubUser: "gvx_github_user",
  vercelUser: "gvx_vercel_user",
  connectedAt: "gvx_connected_at",
} as const

function safeGet(key: string) {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    return
  }
}

function safeRemove(key: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(key)
  } catch {
    return
  }
}

export const storage = {
  getGithubToken: () => safeGet(KEYS.githubToken),
  getVercelToken: () => safeGet(KEYS.vercelToken),
  setTokens: (githubToken: string, vercelToken: string) => {
    safeSet(KEYS.githubToken, githubToken)
    safeSet(KEYS.vercelToken, vercelToken)
    safeSet(KEYS.connectedAt, new Date().toISOString())
  },
  getGithubUser: (): GithubUser | null => {
    const raw = safeGet(KEYS.githubUser)
    return raw ? JSON.parse(raw) : null
  },
  getVercelUser: (): VercelUser | null => {
    const raw = safeGet(KEYS.vercelUser)
    return raw ? JSON.parse(raw) : null
  },
  setGithubUser: (user: GithubUser) => safeSet(KEYS.githubUser, JSON.stringify(user)),
  setVercelUser: (user: VercelUser) => safeSet(KEYS.vercelUser, JSON.stringify(user)),
  getConnectedAt: () => safeGet(KEYS.connectedAt),
  isAuthenticated: () => Boolean(safeGet(KEYS.githubToken) && safeGet(KEYS.vercelToken)),
  clearAll: () => {
    Object.values(KEYS).forEach(safeRemove)
    if (typeof window !== "undefined") {
      window.sessionStorage.clear()
    }
  },
}

export function cacheGet<T>(key: string, maxAgeMs: number): T | null {
  if (typeof window === "undefined") return null
  const raw = window.sessionStorage.getItem(key)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as { data: T; ts: number }
    if (Date.now() - parsed.ts > maxAgeMs) return null
    return parsed.data
  } catch {
    return null
  }
}

export function cacheSet<T>(key: string, data: T) {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }))
}
