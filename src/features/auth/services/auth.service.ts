import { api } from "@/lib/api"

export type LoginResponse = {
  message: string
  user: {
    email: string
    roles: string[]
    isAdmin: boolean
  }
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return api.post<LoginResponse, { email: string; password: string }>(
    "/api/v1/login",
    { email, password },
  )
}

export async function logoutWithCredentials(email: string, password: string) {
  return api.post<{ message: string }, { email: string; password: string }>(
    "/api/v1/logout",
    { email, password },
  )
}