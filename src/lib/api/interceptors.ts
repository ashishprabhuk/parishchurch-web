import { apiClient, normalizeApiError } from "@/lib/api/client"

function getAuthToken() {
  return localStorage.getItem("auth_token")
}

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
)
