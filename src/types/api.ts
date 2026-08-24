export type ApiSuccess<T> = {
  success: true
  data: T
  message?: string
}

export type ApiFailure = {
  success: false
  code: string
  message: string
  status?: number
  details?: unknown
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure
