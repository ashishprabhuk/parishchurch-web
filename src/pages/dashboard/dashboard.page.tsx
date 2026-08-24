import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { RefreshCcw, Rocket } from "lucide-react"
import { useState } from "react"

import { Combobox } from "@/components/common/combobox"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { CopyButton } from "@/components/common/copy-button"
import { DatePicker } from "@/components/common/date-picker"
import { SearchInput } from "@/components/common/search-input"
import { StatCard } from "@/components/data-display/stat-card"
import { DataTable } from "@/components/data-display/data-table"
import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { SuccessState } from "@/components/feedback/success-state"
import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDashboard, useRefreshDashboard } from "@/features/example"
import { ProfileForm } from "@/features/example/components/profile-form"
import { projectColumns } from "@/features/example/components/project-columns"
import { notify } from "@/lib/toast"

const trendData = [
  { name: "Mon", value: 34 },
  { name: "Tue", value: 46 },
  { name: "Wed", value: 41 },
  { name: "Thu", value: 58 },
  { name: "Fri", value: 54 },
  { name: "Sat", value: 65 },
  { name: "Sun", value: 62 },
]

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboard()
  const refresh = useRefreshDashboard()
  const [search, setSearch] = useState("")
  const [owner, setOwner] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  if (isError) {
    return (
      <PageContainer>
        <ErrorState
          title="Dashboard failed to load"
          description="Could not fetch dashboard payload."
          onRetry={() => {
            void refetch()
          }}
        />
      </PageContainer>
    )
  }

  const filteredProjects = (data?.projects ?? []).filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) &&
      (owner === "all" || project.owner.toLowerCase() === owner),
  )

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        title="Starter Dashboard"
        subtitle="Demonstrates table, chart, forms, states, toasts, and reusable architecture."
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                notify.info("Informational toast")
                notify.warning("Warning toast")
              }}
            >
              Toast demo
            </Button>
            <ConfirmDialog
              trigger={
                <Button variant="outline">
                  <Rocket className="mr-2 size-4" /> Confirm dialog
                </Button>
              }
              title="Ship starter setup?"
              description="This confirms a sample action and triggers a success toast."
              onConfirm={() => notify.success("Starter action confirmed")}
            />
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Dialog demo
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reusable dialog pattern</DialogTitle>
                  <DialogDescription>
                    Use this pattern for confirmations, quick forms, and
                    metadata previews.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton>
                  <Button
                    onClick={() => notify.success("Dialog action completed")}
                  >
                    Confirm action
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => refresh.mutate()}
              disabled={refresh.isPending}
            >
              <RefreshCcw className="mr-2 size-4" />
              {refresh.isPending ? "Refreshing..." : "Refresh data"}
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={String(data?.stats.activeProjects ?? 0)}
          delta={14.1}
        />
        <StatCard
          title="Release Velocity"
          value={data?.stats.releaseVelocity ?? "--"}
          delta={8.4}
        />
        <StatCard
          title="Incident Rate"
          value={data?.stats.incidentRate ?? "--"}
          delta={-2.6}
        />
        <StatCard
          title="Customer NPS"
          value={data?.stats.customerNps ?? "--"}
          delta={6.2}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="glass-panel xl:col-span-2">
          <CardHeader>
            <CardTitle>Weekly performance trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#trendFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <p className="text-muted-foreground text-sm">
                Loading activity...
              </p>
            ) : (data?.activity?.length ?? 0) === 0 ? (
              <EmptyState
                title="No recent activity"
                description="Events from your product workflows will appear here."
              />
            ) : (
              data?.activity.map((item) => (
                <div
                  key={item.id}
                  className="border-border/70 bg-card/80 rounded-lg border p-3"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.timestamp}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="glass-panel xl:col-span-3">
          <CardHeader className="space-y-3">
            <CardTitle>Project inventory table</CardTitle>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Filter local dataset before table-level filtering"
              />
              <Combobox
                value={owner}
                onChange={setOwner}
                options={[
                  { label: "All owners", value: "all" },
                  { label: "Alex", value: "alex" },
                  { label: "Nia", value: "nia" },
                  { label: "Sam", value: "sam" },
                  { label: "Mina", value: "mina" },
                ]}
              />
              <DatePicker date={selectedDate} onChange={setSelectedDate} />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={projectColumns}
              data={filteredProjects}
              loading={isLoading}
            />
          </CardContent>
        </Card>

        <Card className="glass-panel xl:col-span-2">
          <CardHeader>
            <CardTitle>Schema-driven form</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SuccessState
          title="Starter health check"
          description="All essential architecture modules are wired and ready to extend."
        />
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Clipboard utility</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <p className="text-muted-foreground text-sm">
              Copy this API route template:
            </p>
            <CopyButton value="/api/v1/resource" />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
