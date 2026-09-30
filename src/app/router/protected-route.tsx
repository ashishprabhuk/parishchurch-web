import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { LoadingState } from "@/components/feedback/loading-state"
import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/auth.store"

type ProtectedRouteProps = {
  isAllowed: boolean
  redirectTo?: string
}

export function ProtectedRoute({
  isAllowed,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)
  const [sessionChecked, setSessionChecked] = useState(false)

  useEffect(() => {
    if (!isAllowed) {
      return
    }

    let active = true

    api
      .get("/api/v1/me")
      .then(() => {
        if (active) setSessionChecked(true)
      })
      .catch(() => {
        if (active) {
          logout()
          setSessionChecked(true)
        }
      })

    return () => {
      active = false
    }
  }, [isAllowed, logout])

  if (!isAllowed) {
    return (
      <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
    )
  }

  if (!sessionChecked) return <LoadingState />

  return <Outlet />
}
