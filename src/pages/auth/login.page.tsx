import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginWithCredentials } from "@/features/auth/services/auth.service"
import { useAuthStore } from "@/stores/auth.store"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
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
      setIsSubmitting(false)
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
      const from = (location.state as { from?: string } | null)?.from
      navigate(from ?? (response.user.isAdmin ? "/admin" : "/"), {
        replace: true,
      })
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-antique-cream/35 flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-2xl shadow-walnut/10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-primary text-primary-foreground relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -bottom-24 size-72 rounded-full border border-primary-foreground/15" />
          <div className="absolute -right-8 -bottom-12 size-48 rounded-full border border-primary-foreground/15" />
          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Return to parish home">
              <span className="grid size-12 place-items-center rounded-full bg-white/95 p-1">
                <img src="/assets/fatima_church_logo.png" alt="" className="size-10 object-contain" />
              </span>
              <span>
                <span className="block font-heading text-xl">Church of Our Lady of Fatima</span>
                <span className="text-primary-foreground/70 block text-[0.62rem] font-semibold tracking-[0.18em] uppercase">Member access</span>
              </span>
            </Link>
          </div>
          <div className="relative space-y-4">
            <p className="text-primary-foreground/65 text-xs font-semibold tracking-[0.2em] uppercase">Welcome home</p>
            <h2 className="font-heading max-w-sm text-4xl leading-tight">A place for prayer, service, and belonging.</h2>
            <p className="text-primary-foreground/75 max-w-sm text-sm leading-relaxed">
              Sign in to manage parish life and stay connected with your community.
            </p>
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-md space-y-8">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="grid size-11 place-items-center rounded-full border border-brass/50 bg-antique-cream p-1">
                <img src="/assets/fatima_church_logo.png" alt="" className="size-9 object-contain" />
              </span>
              <div>
                <p className="font-heading text-lg leading-none">Church of Our Lady of Fatima</p>
                <p className="text-muted-foreground mt-1 text-[0.6rem] font-semibold tracking-[0.16em] uppercase">Member access</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">Member sign in</p>
              <h1 className="font-heading text-walnut text-3xl sm:text-4xl">Welcome back</h1>
              <p className="text-muted-foreground text-sm leading-relaxed">Sign in to continue to your parish account.</p>
            </div>
            <form className="space-y-5" onSubmit={onLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className="h-11" aria-invalid={Boolean(fieldErrors.email)} />
                {fieldErrors.email ? <p className="text-destructive text-xs">{fieldErrors.email}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required className="h-11" aria-invalid={Boolean(fieldErrors.password)} />
                {fieldErrors.password ? <p className="text-destructive text-xs">{fieldErrors.password}</p> : null}
              </div>
              {error ? <p className="bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm" role="alert">{error}</p> : null}
              <Button className="h-11 w-full text-sm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <p className="text-muted-foreground text-center text-sm">
              <Link className="text-primary font-medium hover:underline" to="/">Return to the parish site</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message)
  }
  return "Unable to sign in. Please check your credentials."
}
