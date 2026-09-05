import { useState } from "react"
import type { ReactElement } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { notify } from "@/lib/toast"
import {
  MOCK_ADMIN_CREDENTIALS,
  MOCK_ADMIN_USER,
  MOCK_MEMBER_CREDENTIALS,
  MOCK_MEMBER_USER,
  useAuthStore,
} from "@/stores/auth.store"


export function AuthDialog({ trigger }: { trigger: ReactElement }) {
  const login = useAuthStore((state) => state.login)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const switchMode = (next: "signin" | "signup") => {
    setError(null)
    setShowPassword(false)
    setMode(next)
  }

  const onSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim().toLowerCase()
    const password = String(data.get("password") ?? "")

    if (
      email === MOCK_ADMIN_CREDENTIALS.email &&
      password === MOCK_ADMIN_CREDENTIALS.password
    ) {
      login(MOCK_ADMIN_USER)
      notify.success(`Welcome back, ${MOCK_ADMIN_USER.name}.`)
      setOpen(false)
      setError(null)
      return
    }
    if (
      email === MOCK_MEMBER_CREDENTIALS.email &&
      password === MOCK_MEMBER_CREDENTIALS.password
    ) {
      login(MOCK_MEMBER_USER)
      notify.success(`Welcome back, ${MOCK_MEMBER_USER.name}.`)
      setOpen(false)
      setError(null)
      return
    }
    setError("Invalid email or password. Try the demo credentials below.")
  }

  const onSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim() || "Parish Member"
    const email = String(data.get("email") ?? "").trim()
    login({ name, email, role: "member" })
    notify.success("Account created. Welcome!")
    setOpen(false)
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="gap-6 rounded-2xl p-8 sm:max-w-md">
        {mode === "signin" ? (
          <>
            <DialogHeader className="gap-1 text-center">
              <DialogTitle className="text-3xl font-semibold tracking-tight">
                Welcome back
              </DialogTitle>
              <DialogDescription className="text-sm">
                Sign in to your parish account
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={onSignIn}>
              <div className="space-y-2">
                <Label htmlFor="auth-signin-email">Email address</Label>
                <Input
                  id="auth-signin-email"
                  name="email"
                  type="email"
                  placeholder="admin@stmaryparish.org"
                  autoComplete="email"
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auth-signin-password">Password</Label>
                  <button
                    type="button"
                    className="text-primary text-xs font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="auth-signin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {error ? (
                <p className="text-destructive text-sm">{error}</p>
              ) : null}

              <label className="flex items-center gap-2 text-sm select-none">
                <Checkbox />
                Keep me signed in
              </label>

              <Button type="submit" className="h-11 w-full text-base">
                Sign in
              </Button>

              <div className="text-muted-foreground rounded-lg border border-dashed px-3 py-2 text-center text-xs">
                <p>
                  Admin demo: {""}
                  <span className="font-medium">
                    {MOCK_ADMIN_CREDENTIALS.email}
                  </span>{""}
                  / {""}
                  <span className="font-medium">
                    {MOCK_ADMIN_CREDENTIALS.password}
                  </span>
                </p>
                <p className="mt-1">
                  Member demo: {""}
                  <span className="font-medium">
                    {MOCK_MEMBER_CREDENTIALS.email}
                  </span>{""}
                  / {""}
                  <span className="font-medium">
                    {MOCK_MEMBER_CREDENTIALS.password}
                  </span>
                </p>
              </div>
            </form>

            <p className="text-muted-foreground text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => switchMode("signup")}
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <DialogHeader className="gap-1 text-center">
              <DialogTitle className="text-3xl font-semibold tracking-tight">
                Create an account
              </DialogTitle>
              <DialogDescription className="text-sm">
                Join the parish community online
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={onSignUp}>
              <div className="space-y-2">
                <Label htmlFor="auth-signup-name">Full name</Label>
                <Input
                  id="auth-signup-name"
                  name="name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-signup-email">Email address</Label>
                <Input
                  id="auth-signup-email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  className="h-11"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="auth-signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="h-11 w-full text-base">
                Create account
              </Button>
            </form>

            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => switchMode("signin")}
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
