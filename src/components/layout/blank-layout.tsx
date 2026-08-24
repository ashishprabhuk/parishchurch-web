import { Outlet } from "react-router-dom"

export function BlankLayout() {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  )
}
