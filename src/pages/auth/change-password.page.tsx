import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { changePassword } from "@/features/auth/services/auth.service"
import { notify } from "@/lib/toast"
import { useAuthStore } from "@/stores/auth.store"

export default function ChangePasswordPage() {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const navigate = useNavigate()
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (values.newPassword.length < 12 || values.newPassword.length > 100) {
      setError("Password must be between 12 and 100 characters.")
      return
    }
    if (values.newPassword !== values.confirmPassword) {
      setError("New passwords do not match.")
      return
    }
    setSubmitting(true)
    try {
      await changePassword(values)
      updateUser({ mustChangePassword: false })
      setValues({ currentPassword: "", newPassword: "", confirmPassword: "" })
      notify.success("Password changed successfully.")
      navigate(user.role === "admin" ? "/admin" : "/", { replace: true })
    } catch (changeError) {
      setError(
        changeError instanceof Error
          ? changeError.message
          : "Could not change your password.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-antique-cream/35 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-6 shadow-xl sm:p-8">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
            Required action
          </p>
          <h1 className="font-heading text-walnut text-3xl">Change your password</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            You must set a new password before continuing.
          </p>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <Label>
            Current password
            <Input
              className="mt-1.5"
              type="password"
              autoComplete="current-password"
              value={values.currentPassword}
              onChange={(event) =>
                setValues({ ...values, currentPassword: event.target.value })
              }
              required
            />
          </Label>
          <Label>
            New password
            <Input
              className="mt-1.5"
              type="password"
              autoComplete="new-password"
              minLength={12}
              maxLength={100}
              value={values.newPassword}
              onChange={(event) =>
                setValues({ ...values, newPassword: event.target.value })
              }
              required
            />
          </Label>
          <Label>
            Confirm new password
            <Input
              className="mt-1.5"
              type="password"
              autoComplete="new-password"
              minLength={12}
              maxLength={100}
              value={values.confirmPassword}
              onChange={(event) =>
                setValues({ ...values, confirmPassword: event.target.value })
              }
              required
            />
          </Label>
          {error ? <p className="text-destructive text-sm" role="alert">{error}</p> : null}
          <Button type="submit" disabled={submitting} className="mt-2 w-full">
            {submitting ? "Updating password..." : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  )
}
