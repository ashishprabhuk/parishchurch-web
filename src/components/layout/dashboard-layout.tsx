import { Outlet } from "react-router-dom"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
