import type { AuthUser } from "@/stores/auth.store"

export const SUPER_ADMIN_ROLE = "ROLE_SUPER_ADMIN"
export const CONTENT_ADMIN_ROLE = "ROLE_CONTENT_ADMIN"

export function hasRole(user: AuthUser | null, role: string): boolean {
  return user?.roles?.some((candidate) => candidate === role) ?? false
}

export function isSuperAdmin(user: AuthUser | null): boolean {
  return hasRole(user, SUPER_ADMIN_ROLE)
}

export function isContentAdmin(user: AuthUser | null): boolean {
  return hasRole(user, CONTENT_ADMIN_ROLE)
}

export function isAdminUser(user: AuthUser | null): boolean {
  return isSuperAdmin(user) || isContentAdmin(user)
}