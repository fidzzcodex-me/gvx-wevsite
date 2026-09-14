import type { GithubUser, GithubRepo, GithubRateLimit, FileContentResponse } from "@/types"

const BASE = "https://api.github.com"

class GithubError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new GithubError(body?.message || `GitHub error ${res.status}`, res.status)
  }
  return res.json()
}

export const github = {
  getUser: (token: string) => request<GithubUser>(token, "/user"),

  getRepos: (token: string, perPage = 5) =>
    request<GithubRepo[]>(token, `/user/repos?sort=updated&per_page=${perPage}`),

  getRateLimit: (token: string) => request<GithubRateLimit>(token, "/rate_limit"),

  getFileContent: async (
    token: string,
    owner: string,
    repo: string,
    path: string,
    branch: string
  ): Promise<FileContentResponse | null> => {
    try {
      const data = await request<{ sha: string; content: string }>(
        token,
        `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`
      )
      return { sha: data.sha, content: data.content }
    } catch (err) {
      if (err instanceof GithubError && err.status === 404) return null
      throw err
    }
  },

  createOrUpdateFile: (
    token: string,
    owner: string,
    repo: string,
    path: string,
    payload: { message: string; content: string; branch: string; sha?: string }
  ) =>
    request<{ commit: { sha: string; html_url: string } }>(
      token,
      `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    ),
}

export { GithubError }
