import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { SiteFooter } from "@/components/parish/site-footer"
import { SiteHeader } from "@/components/parish/site-header"

export function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
