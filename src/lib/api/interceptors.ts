import { apiClient, normalizeApiError } from "@/lib/api/client"
import { useAuthStore } from "@/stores/auth.store"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))

  if (!cookie) return null

  try {
    return decodeURIComponent(cookie.slice(name.length + 1))
  } catch {
    return cookie.slice(name.length + 1)
  }
}

apiClient.interceptors.request.use((config) => {
  const xsrfToken = getCookie("XSRF-TOKEN")

  if (xsrfToken) {
    config.headers.set("X-XSRF-TOKEN", xsrfToken)
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error)
    const requestUrl = String(error.config?.url ?? "")
    const isLoginRequest = requestUrl.includes("/api/v1/login")
    const isLogoutRequest = requestUrl.includes("/api/v1/logout")
    const isAdminRoute =
      typeof window !== "undefined" &&
      (window.location.pathname.startsWith("/admin") ||
        window.location.pathname.startsWith("/profile"))

    if (
      normalizedError.status === 401 &&
      isAdminRoute &&
      !isLoginRequest &&
      !isLogoutRequest
    ) {
      useAuthStore.getState().logout()
      window.location.replace("/login")
    }

    return Promise.reject(normalizedError)
  },
)
