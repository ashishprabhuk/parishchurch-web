import { lazy, Suspense } from "react"
import type { ReactNode } from "react"
import type { RouteObject } from "react-router-dom"

import { LoadingState } from "@/components/feedback/loading-state"
import { AdminLayout } from "@/components/layout/admin-layout"
import { AppLayout } from "@/components/layout/app-layout"
import { BlankLayout } from "@/components/layout/blank-layout"
import { ProtectedRoute } from "@/app/router/protected-route"
import { useAuthStore } from "@/stores/auth.store"

const HomePage = lazy(() => import("@/pages/home/home.page"))

const PrayerLiturgyPage = lazy(
  () => import("@/pages/prayer-liturgy/prayer-liturgy.page"),
)
const LivestreamPage = lazy(
  () => import("@/pages/prayer-liturgy/livestream.page"),
)
const MassSchedulePage = lazy(
  () => import("@/pages/prayer-liturgy/mass-schedule.page"),
)
const SacramentsPage = lazy(
  () => import("@/pages/prayer-liturgy/sacraments.page"),
)

const EventsPage = lazy(() => import("@/pages/events/events.page"))
const EventsCalendarPage = lazy(() => import("@/pages/events/calendar.page"))
const ChroniclePage = lazy(() => import("@/pages/events/chronicle.page"))
const ReachingOutPage = lazy(() => import("@/pages/events/reaching-out.page"))

const AnnouncementsPage = lazy(
  () => import("@/pages/announcements/announcements.page"),
)
const AnnouncementDetailPage = lazy(
  () => import("@/pages/announcements/announcement-detail.page"),
)

const WhoWeArePage = lazy(() => import("@/pages/who-we-are/who-we-are.page"))
const ClergyPage = lazy(() => import("@/pages/who-we-are/clergy.page"))
const CommunitiesPage = lazy(
  () => import("@/pages/who-we-are/communities.page"),
)
const CellsAssociationsPage = lazy(
  () => import("@/pages/who-we-are/cells-associations.page"),
)
const HistoryPage = lazy(() => import("@/pages/who-we-are/history.page"))

const ContactPage = lazy(() => import("@/pages/contact/contact.page"))
const DonatePage = lazy(() => import("@/pages/donate/donate.page"))
const ProfilePage = lazy(() => import("@/pages/profile/profile.page"))

const TermsPage = lazy(() => import("@/pages/legal/terms.page"))
const PrivacyPage = lazy(() => import("@/pages/legal/privacy.page"))
const RefundPolicyPage = lazy(() => import("@/pages/legal/refund-policy.page"))

const NotFoundPage = lazy(() => import("@/pages/not-found/not-found.page"))
const GlobalErrorPage = lazy(() => import("@/pages/error/global-error.page"))

const AdminDashboardPage = lazy(
  () => import("@/features/admin/admin-dashboard.page"),
)
const AdminEntityPage = lazy(() => import("@/features/admin/admin-entity.page"))

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingState />}>{children}</Suspense>
}

function AdminGate() {
  const isAdmin = useAuthStore(
    (state) => state.isAuthenticated && state.user?.role === "admin",
  )
  return <ProtectedRoute isAllowed={isAdmin} redirectTo="/" />
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
        path: "prayer-liturgy",
        element: (
          <LazyRoute>
            <PrayerLiturgyPage />
          </LazyRoute>
        ),
      },
      {
        path: "prayer-liturgy/livestream",
        element: (
          <LazyRoute>
            <LivestreamPage />
          </LazyRoute>
        ),
      },
      {
        path: "prayer-liturgy/mass-schedule",
        element: (
          <LazyRoute>
            <MassSchedulePage />
          </LazyRoute>
        ),
      },
      {
        path: "prayer-liturgy/sacraments",
        element: (
          <LazyRoute>
            <SacramentsPage />
          </LazyRoute>
        ),
      },
      {
        path: "events",
        element: (
          <LazyRoute>
            <EventsPage />
          </LazyRoute>
        ),
      },
      {
        path: "events/calendar",
        element: (
          <LazyRoute>
            <EventsCalendarPage />
          </LazyRoute>
        ),
      },
      {
        path: "events/chronicle",
        element: (
          <LazyRoute>
            <ChroniclePage />
          </LazyRoute>
        ),
      },
      {
        path: "events/reaching-out",
        element: (
          <LazyRoute>
            <ReachingOutPage />
          </LazyRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <LazyRoute>
            <AnnouncementsPage />
          </LazyRoute>
        ),
      },
      {
        path: "announcements/:slug",
        element: (
          <LazyRoute>
            <AnnouncementDetailPage />
          </LazyRoute>
        ),
      },
      {
        path: "who-we-are",
        element: (
          <LazyRoute>
            <WhoWeArePage />
          </LazyRoute>
        ),
      },
      {
        path: "who-we-are/clergy",
        element: (
          <LazyRoute>
            <ClergyPage />
          </LazyRoute>
        ),
      },
      {
        path: "who-we-are/communities",
        element: (
          <LazyRoute>
            <CommunitiesPage />
          </LazyRoute>
        ),
      },
      {
        path: "who-we-are/cells-associations",
        element: (
          <LazyRoute>
            <CellsAssociationsPage />
          </LazyRoute>
        ),
      },
      {
        path: "who-we-are/history",
        element: (
          <LazyRoute>
            <HistoryPage />
          </LazyRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <LazyRoute>
            <ContactPage />
          </LazyRoute>
        ),
      },
      {
        path: "donate",
        element: (
          <LazyRoute>
            <DonatePage />
          </LazyRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <LazyRoute>
            <ProfilePage />
          </LazyRoute>
        ),
      },
      {
        path: "terms",
        element: (
          <LazyRoute>
            <TermsPage />
          </LazyRoute>
        ),
      },
      {
        path: "privacy",
        element: (
          <LazyRoute>
            <PrivacyPage />
          </LazyRoute>
        ),
      },
      {
        path: "refund-policy",
        element: (
          <LazyRoute>
            <RefundPolicyPage />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminGate />,
    errorElement: (
      <LazyRoute>
        <GlobalErrorPage />
      </LazyRoute>
    ),
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyRoute>
                <AdminDashboardPage />
              </LazyRoute>
            ),
          },
          {
            path: ":entity",
            element: (
              <LazyRoute>
                <AdminEntityPage />
              </LazyRoute>
            ),
          },
        ],
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
