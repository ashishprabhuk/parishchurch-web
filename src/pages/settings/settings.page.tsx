import { useAuthStore } from "@/stores/auth.store"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"

export default function SettingsPage() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

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
            onClick={() => {
              logout()
              navigate("/login")
            }}
          >
            Log out
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
