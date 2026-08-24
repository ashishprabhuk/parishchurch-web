import { Navigate, Outlet, useLocation } from "react-router-dom"

type ProtectedRouteProps = {
  isAllowed: boolean
  redirectTo?: string
}

export function ProtectedRoute({
  isAllowed,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation()

  if (!isAllowed) {
    return (
      <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
    )
  }

  return <Outlet />
}
