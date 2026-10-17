import { useState } from "react"
import { useAuthStore } from "@/stores/auth.store"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  changePassword,
  logoutWithCredentials,
} from "@/features/auth/services/auth.service"
import { notify } from "@/lib/toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"

export default function SettingsPage() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const onChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passwords.newPassword.length < 12 || passwords.newPassword.length > 100) return notify.error("Password must be between 12 and 100 characters.")
    if (passwords.newPassword !== passwords.confirmPassword) return notify.error("Passwords do not match.")
    setIsChangingPassword(true)
    try {
      const response = await changePassword(passwords)
      notify.success(response.message || "Password changed.")
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch {
      notify.error("Could not change your password.")
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        subtitle="Starter placeholder for account, billing, notifications, and workspace controls."
      />
      <Card className="glass-panel max-w-2xl">
        <CardHeader>
          <CardTitle>Session controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            This route demonstrates a protected page and app-level auth state
            wiring.
          </p>
          <Button
            variant="outline"
            onClick={async () => {
              const user = useAuthStore.getState().user
              if (user) {
                try {
                  await logoutWithCredentials(user.email, "")
                } catch {
                  // Local logout still prevents the stale client session from being reused.
                }
              }
              logout()
              navigate("/login")
            }}
          >
            Log out
          </Button>
        </CardContent>
      </Card>
      <Card className="glass-panel max-w-2xl">
        <CardHeader><CardTitle>Change password</CardTitle></CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onChangePassword}>
            <Label>Current password<Input type="password" value={passwords.currentPassword} onChange={(event) => setPasswords({ ...passwords, currentPassword: event.target.value })} required /></Label>
            <Label>New password<Input type="password" minLength={12} maxLength={100} value={passwords.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.target.value })} required /></Label>
            <Label>Confirm new password<Input type="password" minLength={12} maxLength={100} value={passwords.confirmPassword} onChange={(event) => setPasswords({ ...passwords, confirmPassword: event.target.value })} required /></Label>
            <Button type="submit" disabled={isChangingPassword}>{isChangingPassword ? "Changing..." : "Change password"}</Button>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
