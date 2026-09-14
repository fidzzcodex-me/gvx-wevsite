import { create } from "zustand"
import { storage } from "@/lib/storage"
import type { GithubUser, VercelUser } from "@/types"

interface AuthState {
  githubToken: string | null
  vercelToken: string | null
  githubUser: GithubUser | null
  vercelUser: VercelUser | null
  hydrated: boolean
  hydrate: () => void
  setSession: (payload: {
    githubToken: string
    vercelToken: string
    githubUser: GithubUser
    vercelUser: VercelUser
  }) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  githubToken: null,
  vercelToken: null,
  githubUser: null,
  vercelUser: null,
  hydrated: false,

  hydrate: () => {
    set({
      githubToken: storage.getGithubToken(),
      vercelToken: storage.getVercelToken(),
      githubUser: storage.getGithubUser(),
      vercelUser: storage.getVercelUser(),
      hydrated: true,
    })
  },

  setSession: ({ githubToken, vercelToken, githubUser, vercelUser }) => {
    storage.setTokens(githubToken, vercelToken)
    storage.setGithubUser(githubUser)
    storage.setVercelUser(vercelUser)
    set({ githubToken, vercelToken, githubUser, vercelUser })
  },

  clear: () => {
    storage.clearAll()
    set({
      githubToken: null,
      vercelToken: null,
      githubUser: null,
      vercelUser: null,
    })
  },
}))
