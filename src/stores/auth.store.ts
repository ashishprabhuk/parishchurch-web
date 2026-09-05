import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AuthUser = {
  name: string
  email: string
  image?: string
  role: "admin" | "member"
  phone?: string
  address?: string
  memberSince?: string
}

/** Demo credentials for the admin portal. */
export const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@stmaryparish.org",
  password: "admin123",
}

/** Demo credentials for a regular parish member. */
export const MOCK_MEMBER_CREDENTIALS = {
  email: "maria@example.com",
  password: "member123",
}

export const MOCK_ADMIN_USER: AuthUser = {
  name: "Parish Admin",
  email: MOCK_ADMIN_CREDENTIALS.email,
  image:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
  role: "admin",
  phone: "+91 22 4000 1234",
  address: "Parish Office, St. Mary of Grace Church, Mumbai",
  memberSince: "2015",
}

export const MOCK_MEMBER_USER: AuthUser = {
  name: "Maria Fernandes",
  email: MOCK_MEMBER_CREDENTIALS.email,
  image:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  role: "member",
  phone: "+91 98200 12345",
  address: "Bandra West, Mumbai",
  memberSince: "2003",
}

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "parish-auth-state",
    },
  ),
)
