export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  company: string | null
  followers: number
  following: number
  public_repos: number
  public_gists: number
  html_url: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
  updated_at: string
  default_branch: string
  language: string | null
  stargazers_count: number
}

export interface GithubRateLimit {
  resources: {
    core: {
      limit: number
      remaining: number
      reset: number
    }
  }
}

export interface VercelUser {
  uid: string
  username: string
  name: string | null
  email: string
  avatar: string | null
}

export interface VercelTeam {
  id: string
  name: string
  slug: string
}

export interface VercelProject {
  id: string
  name: string
  framework: string | null
  updatedAt: number
  latestDeployments?: VercelDeployment[]
  link?: {
    type: string
    repo: string
    org?: string
  }
}

export interface VercelDeployment {
  uid: string
  name: string
  url: string
  state: "READY" | "ERROR" | "BUILDING" | "QUEUED" | "CANCELED" | "INITIALIZING"
  created: number
  target: string | null
  meta?: Record<string, string>
}

export type ConnectionStatus = "idle" | "loading" | "success" | "error"

export interface FileContentResponse {
  sha: string
  content: string
}

export interface CommitResult {
  commitUrl: string
  sha: string
}
