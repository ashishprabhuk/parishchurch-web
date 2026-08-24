import { lazy, Suspense } from "react"
import type { ReactNode } from "react"
import type { RouteObject } from "react-router-dom"

import { ProtectedRoute } from "@/app/router/protected-route"
import { AppLayout } from "@/components/layout/app-layout"
import { AuthLayout } from "@/components/layout/auth-layout"
import { BlankLayout } from "@/components/layout/blank-layout"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LoadingState } from "@/components/feedback/loading-state"
import { useAuthStore } from "@/stores/auth.store"

const HomePage = lazy(() => import("@/pages/home/home.page"))
const LoginPage = lazy(() => import("@/pages/auth/login.page"))
const RegisterPage = lazy(() => import("@/pages/auth/register.page"))
const DashboardPage = lazy(() => import("@/pages/dashboard/dashboard.page"))
const SettingsPage = lazy(() => import("@/pages/settings/settings.page"))
const NotFoundPage = lazy(() => import("@/pages/not-found/not-found.page"))
const GlobalErrorPage = lazy(() => import("@/pages/error/global-error.page"))

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingState />}>{children}</Suspense>
}

function ProtectedOutlet() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return <ProtectedRoute isAllowed={isAuthenticated} />
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <LazyRoute>
        <GlobalErrorPage />
      </LazyRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <HomePage />
          </LazyRoute>
        ),
      },
      {
        element: <ProtectedOutlet />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: (
                  <LazyRoute>
                    <DashboardPage />
                  </LazyRoute>
                ),
              },
              {
                path: "settings",
                element: (
                  <LazyRoute>
                    <SettingsPage />
                  </LazyRoute>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <LazyRoute>
            <LoginPage />
          </LazyRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <LazyRoute>
            <RegisterPage />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: "*",
        element: (
          <LazyRoute>
            <NotFoundPage />
          </LazyRoute>
        ),
      },
    ],
  },
]
