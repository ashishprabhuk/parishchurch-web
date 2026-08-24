import { Outlet } from "react-router-dom"

import { SiteFooter } from "@/components/parish/site-footer"
import { SiteHeader } from "@/components/parish/site-header"

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
