import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/auth.store"

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const onLogin = () => {
    login()
    navigate("/dashboard")
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground text-sm">
          Use this screen as your auth entry template.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@company.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <Button className="w-full" onClick={onLogin}>
        Sign in
      </Button>
      <p className="text-muted-foreground text-sm">
        No account?{" "}
        <Link className="text-primary underline" to="/register">
          Create one
        </Link>
      </p>
    </div>
  )
}
