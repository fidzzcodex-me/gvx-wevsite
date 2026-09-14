import type { VercelUser, VercelProject, VercelDeployment } from "@/types"

const BASE = "https://api.vercel.com"

class VercelError extends Error {
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
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new VercelError(body?.error?.message || `Vercel error ${res.status}`, res.status)
  }
  return res.json()
}

export const vercel = {
  getUser: async (token: string) => {
    const data = await request<{ user: VercelUser }>(token, "/v2/user")
    return data.user
  },

  getProjects: async (token: string) => {
    const data = await request<{ projects: VercelProject[] }>(token, "/v9/projects?limit=20")
    return data.projects
  },

  getDeployments: async (token: string, limit = 5) => {
    const data = await request<{ deployments: VercelDeployment[] }>(
      token,
      `/v6/deployments?limit=${limit}`
    )
    return data.deployments
  },

  createDeployment: (token: string, name: string, gitSource: { type: string; repoId?: string; ref?: string }) =>
    request<{ id: string; url: string }>(token, "/v13/deployments", {
      method: "POST",
      body: JSON.stringify({
        name,
        target: "production",
        gitSource,
      }),
    }),

  getDeploymentStatus: (token: string, id: string) =>
    request<VercelDeployment>(token, `/v13/deployments/${id}`),
}

export { VercelError }
