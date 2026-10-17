import { api } from "@/lib/api"

export type LoginResponse = {
  message: string
  user: {
    name?: string
    email: string
    roles: string[]
    isAdmin: boolean
    mustChangePassword?: boolean
  }
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post<unknown, { email: string; password: string }>(
    "/api/v1/login",
    { email, password },
  )
  try {
    return normalizeLoginResponse(response)
  } catch {
    const currentUser = await getCurrentUser()
    return {
      message: getMessage(response),
      user: currentUser,
    }
  }
}

export type CurrentUser = {
  email: string
  roles: string[]
  isAdmin: boolean
  mustChangePassword?: boolean
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await api.get<unknown>("/api/v1/me")
  const root = response && typeof response === "object"
    ? (response as Record<string, unknown>)
    : {}
  const data = unwrapData(root.data)
  const value = root.user ?? data?.user ?? data ?? root
  if (!value || typeof value !== "object") {
    throw new Error("Current-user response was invalid.")
  }
  const user = value as Record<string, unknown>
  const email = String(user.email ?? "").trim()
  if (!email) throw new Error("Current-user response did not include an email.")
  const roles = Array.isArray(user.roles)
    ? user.roles.map((role) => String(role))
    : []
  return {
    email,
    roles,
    isAdmin: roles.includes("ROLE_SUPER_ADMIN") || roles.includes("ROLE_CONTENT_ADMIN"),
    mustChangePassword: user.mustChangePassword === true,
  }
}

function unwrapData(value: unknown): Record<string, unknown> | undefined {
  const item = Array.isArray(value) ? value[0] : value
  return item && typeof item === "object"
    ? (item as Record<string, unknown>)
    : undefined
}

function normalizeLoginResponse(value: unknown): LoginResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Login response was empty.")
  }

  const root = value as Record<string, unknown>
  const data = unwrapData(root.data)
  const userValue = root.user ?? data?.user ?? data ?? root
  if (!userValue || typeof userValue !== "object") {
    throw new Error("Login response did not include a user.")
  }

  const user = userValue as Record<string, unknown>
  const userEmail = String(user.email ?? root.email ?? "").trim()
  if (!userEmail) throw new Error("Login response did not include an email.")

  const roles = Array.isArray(user.roles)
    ? user.roles.map((role) => String(role))
    : []
  const isAdmin = roles.includes("ROLE_SUPER_ADMIN") || roles.includes("ROLE_CONTENT_ADMIN")

  return {
    message: getMessage(value),
    user: {
      name: String(user.name ?? user.fullName ?? "").trim() || undefined,
      email: userEmail,
      roles,
      isAdmin,
      mustChangePassword: user.mustChangePassword === true,
    },
  }
}

function getMessage(value: unknown): string {
  if (!value || typeof value !== "object") return ""
  const root = value as Record<string, unknown>
  return String(root.message ?? "")
}

export async function logoutWithCredentials(email: string, password: string) {
  return api.post<{ message: string }, { email: string; password: string }>(
    "/api/v1/logout",
    { email, password },
  )
}

export function signupWithCredentials(payload: {
  fullName: string
  email: string
  password: string
}) {
  return api.post<{ fullName: string; email: string }, typeof payload>(
    "/api/v1/signup",
    payload,
  )
}

export function changePassword(payload: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) {
  return api.post<{ message: string }, typeof payload>(
    "/api/v1/me/change-password",
    payload,
  )
}