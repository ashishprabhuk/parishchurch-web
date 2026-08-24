import axios, { AxiosError } from "axios"

import { env } from "@/lib/env"

export const apiClient = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
})

export type NormalizedApiError = {
  code: string
  message: string
  status?: number
  details?: unknown
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      "Something went wrong"

    return {
      code: `HTTP_${status ?? "UNKNOWN"}`,
      message,
      status,
      details: error.response?.data,
    }
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred.",
    details: error,
  }
}
