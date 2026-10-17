import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { LoadingState } from "@/components/feedback/loading-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSeo } from "@/hooks/use-seo"
import { notify } from "@/lib/toast"

import {
  useAdminUsers,
  useCreateAdminUser,
  useDeleteAdminUser,
  useResetAdminUserPassword,
} from "./use-admin"

export default function AdminUsersPage() {
  useSeo({
    title: "Admin Users | Parish Admin",
    description: "Manage parish administrator accounts and roles.",
    canonicalPath: "/admin/users",
  })
  const users = useAdminUsers()
  const createUser = useCreateAdminUser()
  const resetPassword = useResetAdminUserPassword()
  const deleteUser = useDeleteAdminUser()
  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwords, setPasswords] = useState<Record<string, string>>({})

  const submitUser = async () => {
    if (
      !userForm.fullName ||
      !userForm.email ||
      !userForm.password
    )
      return notify.error("Complete all admin user fields.")
    if (userForm.password !== userForm.confirmPassword)
      return notify.error("Passwords do not match.")
    if (userForm.password.length < 12 || userForm.password.length > 100)
      return notify.error("Password must be between 12 and 100 characters.")
    try {
      await createUser.mutateAsync(userForm)
      setUserForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      notify.success("Admin user created.")
    } catch {
      notify.error("Could not create admin user.")
    }
  }

  const reset = async (id: string) => {
    const password = passwords[id] ?? ""
    if (password.length < 12 || password.length > 100)
      return notify.error("Password must be between 12 and 100 characters.")
    try {
      await resetPassword.mutateAsync({
        id,
        newPassword: password,
        confirmPassword: password,
      })
      setPasswords((current) => ({ ...current, [id]: "" }))
      notify.success("Temporary password set.")
    } catch {
      notify.error("Could not reset the password.")
    }
  }

  if (users.isLoading)
    return <LoadingState label="Loading admin users..." />

  if (users.isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <h1 className="font-heading text-2xl">Admin Users</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            You are not authorized to view Content Admin accounts.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl">Admin Users</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage Content Admin accounts.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(users.data ?? []).map((user) => (
              <div
                key={user.id}
                className="border-border/70 grid gap-3 rounded-lg border p-4 lg:grid-cols-[minmax(0,1fr)_10rem_12rem_auto] lg:items-center"
              >
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  <p className="text-muted-foreground text-xs">
                    {user.active ? "Active" : "Inactive"}
                    {user.lastLoginAt
                      ? ` | Last login ${new Date(user.lastLoginAt).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
                <span className="text-muted-foreground text-sm">
                  {user.roles?.join(", ") ?? user.role ?? "ROLE_CONTENT_ADMIN"}
                </span>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    minLength={12}
                    maxLength={100}
                    placeholder="New password"
                    value={passwords[user.id] ?? ""}
                    onChange={(event) =>
                      setPasswords((current) => ({
                        ...current,
                        [user.id]: event.target.value,
                      }))
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void reset(user.id)}
                  >
                    Reset
                  </Button>
                </div>
                <ConfirmDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${user.fullName}`}
                    >
                      <Trash2 className="text-destructive size-4" />
                    </Button>
                  }
                  title="Delete admin user?"
                  description={`Permanently delete ${user.fullName}.`}
                  onConfirm={() =>
                    deleteUser
                      .mutateAsync(user.id)
                      .then(() => notify.success("Admin user deleted."))
                      .catch(() => notify.error("Could not delete admin user."))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="size-4" /> New admin user
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Label>
                Full name
                <Input
                  value={userForm.fullName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, fullName: e.target.value })
                  }
                />
              </Label>
              <Label>
                Email
                <Input
                  type="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                />
              </Label>
              <Label>
                Password
                <Input
                  type="password"
                  minLength={12}
                  maxLength={100}
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                />
              </Label>
              <Label>
                Confirm password
                <Input
                  type="password"
                  minLength={12}
                  maxLength={100}
                  value={userForm.confirmPassword}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </Label>
              <Button onClick={() => void submitUser()}>
                <Plus className="size-4" /> Create user
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
