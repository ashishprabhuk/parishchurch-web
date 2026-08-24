import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="grid min-h-screen place-items-center px-4 py-12">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6">
        <Outlet />
      </div>
    </div>
  )
}
