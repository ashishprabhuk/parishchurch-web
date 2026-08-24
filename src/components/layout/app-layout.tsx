import { Outlet } from "react-router-dom"

import { Footer } from "@/components/layout/footer"

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <Footer />
    </div>
  )
}
