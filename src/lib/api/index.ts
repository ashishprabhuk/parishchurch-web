import type { AxiosRequestConfig } from "axios"

import { apiClient } from "@/lib/api/client"

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.get<T>(url, config)
    return response.data
  },
  post: async <T, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig,
  ) => {
    const response = await apiClient.post<T>(url, payload, config)
    return response.data
  },
  put: async <T, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig,
  ) => {
    const response = await apiClient.put<T>(url, payload, config)
    return response.data
  },
  patch: async <T, TPayload = unknown>(
    url: string,
    payload?: TPayload,
    config?: AxiosRequestConfig,
  ) => {
    const response = await apiClient.patch<T>(url, payload, config)
    return response.data
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await apiClient.delete<T>(url, config)
    return response.data
  },
}
