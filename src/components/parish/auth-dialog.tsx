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
import { loginWithCredentials } from "@/features/auth/services/auth.service"
import {
  useAuthStore,
} from "@/stores/auth.store"


export function AuthDialog({ trigger }: { trigger: ReactElement }) {
  const login = useAuthStore((state) => state.login)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const switchMode = (next: "signin" | "signup") => {
    setError(null)
    setFieldErrors({})
    setShowPassword(false)
    setMode(next)
  }

  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim().toLowerCase()
    const password = String(data.get("password") ?? "")

    const nextErrors: Record<string, string> = {}
    if (!email) nextErrors.email = "Email address is required."
    else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!password) nextErrors.password = "Password is required."
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      return
    }

    try {
      const response = await loginWithCredentials(email, password)
      login({
        name: response.user.email,
        email: response.user.email,
        roles: response.user.roles,
        isAdmin: response.user.isAdmin,
        role: response.user.isAdmin ? "admin" : "member",
      })
      notify.success(response.message || `Welcome back, ${response.user.email}.`)
      setOpen(false)
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim().toLowerCase()
    const password = String(data.get("password") ?? "")
    const nextErrors: Record<string, string> = {}
    if (name.length < 2) nextErrors.name = "Enter your full name."
    if (!email) nextErrors.email = "Email address is required."
    else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters."
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      return
    }
    login({ name, email, role: "member" })
    notify.success("Account created. Welcome!")
    setOpen(false)
    setError(null)
    setFieldErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="gap-5 rounded-2xl p-5 sm:p-8 w-[calc(100vw-2rem)] sm:max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto">
        {mode === "signin" ? (
          <>
            <DialogHeader className="gap-1 text-center">
              <DialogTitle className="text-2xl sm:text-3xl font-semibold tracking-tight">
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
                    placeholder="admin@churchoffatima.org"
                  autoComplete="email"
                  className="h-11"
                  required
                />
                {fieldErrors.email ? (
                  <p className="text-destructive text-xs">{fieldErrors.email}</p>
                ) : null}
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
                {fieldErrors.password ? (
                  <p className="text-destructive text-xs">{fieldErrors.password}</p>
                ) : null}
              </div>

              {error ? (
                <p className="text-destructive text-sm">{error}</p>
              ) : null}

              <label className="flex items-center gap-2 text-sm select-none">
                <Checkbox />
                Keep me signed in
              </label>

              <Button type="submit" className="h-11 w-full text-base" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              {/* <div className="text-muted-foreground rounded-lg border border-dashed px-3 py-2 text-center text-xs">
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
              </div> */}
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
                {fieldErrors.name ? (
                  <p className="text-destructive text-xs">{fieldErrors.name}</p>
                ) : null}
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
                {fieldErrors.email ? (
                  <p className="text-destructive text-xs">{fieldErrors.email}</p>
                ) : null}
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
                {fieldErrors.password ? (
                  <p className="text-destructive text-xs">{fieldErrors.password}</p>
                ) : null}
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

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message)
  }
  return "Unable to sign in. Please check your credentials."
}
